import * as leadRepository from './lead.repository.js';

export const createPublicLead = async (leadData) => {
  return await leadRepository.createLead(leadData);
};

export const getLeads = async () => {
  return await leadRepository.getLeads();
};

export const getLeadById = async (id) => {
  const lead = await leadRepository.getLeadById(id);
  if (!lead) {
    const error = new Error('Lead not found');
    error.statusCode = 404;
    throw error;
  }
  return lead;
};

export const updateLead = async (id, data) => {
  // Verify existence first
  await getLeadById(id);
  return await leadRepository.updateLead(id, data);
};

export const deleteLead = async (id) => {
  await getLeadById(id);
  return await leadRepository.deleteLead(id);
};
