import { api } from '../../../lib/axios.js';

export const submitPublicLead = (data) => {
  return api.post('/leads/public', data);
};

export const getLeads = () => {
  return api.get('/leads');
};

export const getLeadById = (id) => {
  return api.get(`/leads/${id}`);
};

export const updateLeadStatus = (id, data) => {
  return api.patch(`/leads/${id}`, data);
};

export const deleteLead = (id) => {
  return api.delete(`/leads/${id}`);
};

export const addLeadNote = (id, content) => {
  return api.post(`/leads/${id}/notes`, { content });
};
