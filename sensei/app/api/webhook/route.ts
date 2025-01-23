import { mpesa } from "@/lib/subapi";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request, res: Response) {
  const body = await req.text();
  const signutre = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = mpesa.webhooks.constructEvent(
      body,
      signutre,
      process.env.NEXT_STRIPE_WEBHOOK_SECRET!,
    )
  } catch (error: any) {
    return new NextResponse(`Webhook threw an error: ${error.messsge}`, {status: 400});
  }

  
}
