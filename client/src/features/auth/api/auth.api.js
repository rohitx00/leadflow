import { api } from '../../../lib/axios.js';

export const login = (credentials) => {
  return api.post('/auth/login', credentials);
};

export const getMe = () => {
  return api.get('/auth/me');
};
