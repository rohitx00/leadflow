import * as taskRepository from './task.repository.js';
import * as leadRepository from '../leads/lead.repository.js';

export const createTask = async (data) => {
  // Verify lead exists
  const lead = await leadRepository.getLeadById(data.leadId);
  if (!lead) {
    const error = new Error('Lead not found');
    error.statusCode = 404;
    throw error;
  }

  return await taskRepository.createTask(data);
};

export const getTaskById = async (id) => {
  const task = await taskRepository.getTaskById(id);
  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }
  return task;
};

export const getMyTasks = async (userId) => {
  return await taskRepository.getTasksByUser(userId);
};

export const getLeadTasks = async (leadId) => {
  return await taskRepository.getTasksByLead(leadId);
};

export const updateTask = async (id, userId, data) => {
  const task = await getTaskById(id);
  
  if (task.assignedToId !== userId) {
    const error = new Error('Forbidden: You can only update your own tasks');
    error.statusCode = 403;
    throw error;
  }

  return await taskRepository.updateTask(id, data);
};
