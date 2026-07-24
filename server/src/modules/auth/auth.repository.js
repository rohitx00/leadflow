import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
