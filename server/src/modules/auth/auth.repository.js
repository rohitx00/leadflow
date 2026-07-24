import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};
