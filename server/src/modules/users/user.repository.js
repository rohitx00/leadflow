import prisma from '../../lib/prisma.js';

export const createUser = async (data) => {
  return await prisma.user.create({ data });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};

export const findAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
  });
};

export const findAllUsersWithLeads = async () => {
  return await prisma.user.findMany({
    select: { 
      id: true, 
      name: true, 
      email: true, 
      role: true, 
      isActive: true, 
      createdAt: true,
      assignedLeads: {
        select: { status: true }
      }
    },
  });
};

export const updateUserRole = async (id, role) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { role },
    });
  } catch (error) {
    if (error.code === 'P2025') return null; // Record to update not found
    throw error;
  }
};

export const updateUserStatus = async (id, isActive) => {
  try {
    return await prisma.user.update({
      where: { id },
      data: { isActive },
    });
  } catch (error) {
    if (error.code === 'P2025') return null; // Record to update not found
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    if (error.code === 'P2025') return false; // Record to delete not found
    throw error;
  }
};
