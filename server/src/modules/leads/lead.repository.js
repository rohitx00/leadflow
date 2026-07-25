import prisma from '../../lib/prisma.js';

export const createLead = async (data) => {
  return await prisma.lead.create({ data });
};

export const getLeads = async (filters = {}) => {
  const { search, status, assignedToId } = filters;
  
  const where = {};
  
  if (status) {
    where.status = status;
  }
  
  if (assignedToId) {
    if (assignedToId === 'unassigned') {
      where.assignedToId = null;
    } else {
      where.assignedToId = assignedToId;
    }
  }
  
  if (search) {
    where.OR = [
      { firstName: { contains: search, mode: 'insensitive' } },
      { lastName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { company: { contains: search, mode: 'insensitive' } },
    ];
  }

  return await prisma.lead.findMany({
    where,
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
    include: {
      assignedTo: {
        select: { id: true, name: true }
      },
      notes: {
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: 'desc' }
      },
      activities: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });
};

export const updateLead = async (id, data) => {
  return await prisma.lead.update({
    where: { id },
    data,
  });
};

export const createActivity = async (leadId, action, description) => {
  return await prisma.activity.create({
    data: { leadId, action, description }
  });
};

export const addNoteToLead = async (leadId, authorId, content) => {
  return await prisma.leadNote.create({
    data: { leadId, authorId, content }
  });
};

export const deleteLead = async (id) => {
  return await prisma.lead.delete({
    where: { id },
  });
};
