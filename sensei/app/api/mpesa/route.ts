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

  } catch (error) {
    console.log("[AN ERROR OCCURED]", error);
    return new NextResponse("Internal server erroe", {status: 500});
  }
}
