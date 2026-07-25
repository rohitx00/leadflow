import prisma from '../../lib/prisma.js';

export const createLead = async (data) => {
  return await prisma.lead.create({ data });
};

export const getLeads = async (filters = {}) => {
  const { search, status, assignedToId, page = 1, limit = 10 } = filters;
  
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

  const skip = (Number(page) - 1) * Number(limit);
  const take = Number(limit);

  const [data, total, statusCounts] = await prisma.$transaction([
    prisma.lead.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }),
    prisma.lead.count({ where }),
    prisma.lead.groupBy({
      by: ['status'],
      where,
      _count: { status: true }
    })
  ]);

  const analytics = {
    total,
    newLeads: 0,
    wonLeads: 0,
    lostLeads: 0
  };

  statusCounts.forEach(item => {
    if (item.status === 'NEW') analytics.newLeads = item._count.status;
    if (item.status === 'CONVERTED') analytics.wonLeads = item._count.status;
    if (item.status === 'LOST') analytics.lostLeads = item._count.status;
  });

  return {
    data,
    analytics,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    }
  };
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
