import { api } from '../../../lib/axios.js';

export const getUsers = () => {
  return api.get('/users');
};
