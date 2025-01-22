import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { mpesa } from "@/lib/subapi";

const settings = absoluteUrl("/settings");

export async function GET() {
  try {
    const {userId} = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorised user", {status: 401});
    }
    const userSubscription = await prisma.subscription.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const session = await mpesa.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settings,
      });

      return new NextResponse(JSON.stringify({
        url: session.url,
      }));
    }

    const session = await mpesa.checkout.sessions.create({
      success_url: settings,
      cancel_url: settings,
      payment_method_types: ["mpesa"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Sensei AI Pro",
              description: "AI pro tool unlimited",
            },
            unit_amount: 3000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({
      url: session.url
    }));

  } catch (error) {
    console.log("[AN ERROR OCCURED]", error);
    return new NextResponse("Internal server erroe", {status: 500});
  }
}
