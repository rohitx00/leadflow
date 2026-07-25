import { api } from '../../../lib/axios.js';

export const createTask = (data) => {
  return api.post('/tasks', data);
};

export const getMyTasks = () => {
  return api.get('/tasks/my-tasks');
};

export const getLeadTasks = (leadId) => {
  return api.get(`/tasks/lead/${leadId}`);
};

export const updateTask = (id, data) => {
  return api.patch(`/tasks/${id}`, data);
};
