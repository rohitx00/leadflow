import { api } from '../../../lib/axios.js';

export const submitPublicLead = (data) => {
  return api.post('/leads/public', data);
};
