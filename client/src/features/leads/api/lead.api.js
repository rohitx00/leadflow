import { api } from '../../../lib/axios.js';

export const submitPublicLead = (data) => {
  return api.post('/leads/public', data);
};

export const getLeads = async () => {
  const response = await api.get('/leads');
  return response.data;
};

export const getLeadById = async (id) => {
  const response = await api.get(`/leads/${id}`);
  return response.data;
};

export const updateLeadStatus = async (id, status) => {
  const response = await api.patch(`/leads/${id}`, { status });
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await api.delete(`/leads/${id}`);
  return response.data;
};
