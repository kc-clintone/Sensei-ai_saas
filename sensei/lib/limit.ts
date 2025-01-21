import { useAuth } from "@clerk/nextjs";
import prisma from "@/lib/db";

const FREE_LIMIT = 10;

export const increaseLimit = async () => {
  const {userId} = useAuth();

  if (!userId) {
    return;
  }

  const limit = await prisma.userLimit.findUnique({
    where: {
      userId,
    },
  })

  if (limit) {
    await prisma.userLimit.update({
      where: { userId: userId },
      data: { limit: limit.limit + 1},
    });
  } else {
    await prisma.userLimit.create({
      data: {
        userId: userId,
        limit: 1,
      },
    });
  }
};


export const checkLimit = async () => {
  const {userId} = useAuth();

  if (!userId) {
    return false;
  }

  const limit = await prisma.userLimit.findUnique({
    where: {
      userId: userId,
    },
  })

  if (!limit || limit.limit < FREE_LIMIT) {
    return true;
  } else {
    return false;
  }
}

export const getLimit = async () => {
  const {userId} = useAuth();

  if (!userId) {
    return 0;
  }

  const limit = await prisma.userLimit.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!limit) {
    return 0;
  }

  return limit.limit;
}
