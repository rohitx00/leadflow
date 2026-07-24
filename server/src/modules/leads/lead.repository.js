import prisma from '../../lib/prisma.js';

export const createLead = async (data) => {
  return await prisma.lead.create({ data });
};

export const getLeads = async (filters = {}) => {
  return await prisma.lead.findMany({
    where: filters,
    orderBy: { createdAt: 'desc' },
    include: {
      assignedTo: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
};

export const getLeadById = async (id) => {
  return await prisma.lead.findUnique({
    where: { id },
  });
};

export const updateLead = async (id, data) => {
  return await prisma.lead.update({
    where: { id },
    data,
  });
};

export const deleteLead = async (id) => {
  return await prisma.lead.delete({
    where: { id },
  });
};
