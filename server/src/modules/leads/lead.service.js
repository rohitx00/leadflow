import * as leadRepository from './lead.repository.js';

export const createPublicLead = async (leadData) => {
  return await leadRepository.createLead(leadData);
};
