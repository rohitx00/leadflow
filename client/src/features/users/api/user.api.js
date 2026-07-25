import { api } from '../../../lib/axios.js';

export const getUsers = () => {
  return api.get('/users');
};

export const createUser = (data) => {
  return api.post('/users', data);
};

export const updateUserRole = (id, role) => {
  return api.patch(`/users/${id}/role`, { role });
};

export const updateUserStatus = (id, isActive) => {
  return api.patch(`/users/${id}/status`, { isActive });
};

export const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};
