import prisma from '../../lib/prisma.js';

export const createUser = async (data) => {
  return await prisma.user.create({ data });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const findAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
};
