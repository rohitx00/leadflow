import prisma from '../../lib/prisma.js';

export const createTask = async (data) => {
  return await prisma.task.create({
    data,
    include: {
      lead: { select: { id: true, firstName: true, lastName: true, company: true } },
    },
  });
};

export const getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: { id },
  });
};

export const getTasksByUser = async (userId) => {
  return await prisma.task.findMany({
    where: { assignedToId: userId, isCompleted: false },
    orderBy: { dueDate: 'asc' },
    include: {
      lead: { select: { id: true, firstName: true, lastName: true, company: true } },
    },
  });
};

export const getTasksByLead = async (leadId, userId) => {
  return await prisma.task.findMany({
    where: { leadId, assignedToId: userId },
    orderBy: { dueDate: 'asc' },
    include: {
      assignedTo: { select: { id: true, name: true } },
    },
  });
};

export const updateTask = async (id, data) => {
  return await prisma.task.update({
    where: { id },
    data,
    include: {
      lead: { select: { id: true, firstName: true, lastName: true, company: true } },
    },
  });
};
