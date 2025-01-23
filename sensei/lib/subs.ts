import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

const DAYS = 86_400_000;

export const checkSubscriptions = async () => {
  const {userId} = await auth();

  if (!userId) return false;

  const userSub = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
    select: {
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeSubscriptionId: true,
    },
  });

  if (!userSub) return false;

  const isValidSub = userSub.stripePriceId && userSub.stripeCurrentPeriodEnd?.getTime()! * DAYS > Date.now();
  return !!isValidSub;
}
