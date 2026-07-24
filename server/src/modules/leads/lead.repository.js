import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createLead = async (data) => {
  return await prisma.lead.create({ data });
};
