import { mpesa } from "@/lib/subapi";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.text();

  const headerList = await headers();
  const signature = headerList.get("Stripe-Signature");

  if (!signature) {
    return new Response("Missing Stripe-Signature header", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = mpesa.webhooks.constructEvent(
      body,
      signature,
      process.env.NEXT_STRIPE_WEBHOOK_SECRET!,
    )
  } catch (error: any) {
    return new NextResponse(`Webhook threw an error: ${error.messsge}`, {status: 400});
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subs = await mpesa.subscriptions.retrieve(session.subscription as string);

    if (!session?.metadata?.userId) {
      return new Response("Missing userId", { status: 400 });
    }

    await prisma.subscription.create({
      data: {
        userId: session?.metadata?.userId,
        stripeSubscriptionId: subs.id,
        stripeCustomerId: subs.customer as string,
        stripePriceId: subs.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subs.current_period_end * 1000),
      },
    });
  }

  if (event.type === "invoice.payment_succeeded") {
    const subs = await mpesa.subscriptions.retrieve(session.subscription as string);
   
    await prisma.subscription.update({
      where: {
        stripeSubscriptionId: subs.id,
      },
      data: {
        stripePriceId: subs.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subs.current_period_end * 1000),
      },
    });
  }

  return new Response(null, { status: 200 });
}
