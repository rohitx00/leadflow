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
  const existingLead = await getLeadById(id);
  const updated = await leadRepository.updateLead(id, data);
  
  if (data.status && data.status !== existingLead.status) {
    await leadRepository.createActivity(id, 'STATUS_CHANGED', `Lead status changed from ${existingLead.status} to ${data.status}`);
  }
  if (data.assignedToId !== undefined && data.assignedToId !== existingLead.assignedToId) {
    // We could fetch user name, but let's keep it simple
    if (data.assignedToId === null) {
      await leadRepository.createActivity(id, 'LEAD_UNASSIGNED', 'Lead was unassigned');
    } else {
      await leadRepository.createActivity(id, 'LEAD_ASSIGNED', 'Lead was assigned to a new representative');
    }
  }

  return updated;
};

export const addNote = async (id, userId, content) => {
  await getLeadById(id);
  const note = await leadRepository.addNoteToLead(id, userId, content);
  await leadRepository.createActivity(id, 'NOTE_ADDED', 'A new note was added to this lead');
  return note;
};

export const deleteLead = async (id) => {
  await getLeadById(id);
  return await leadRepository.deleteLead(id);
};
