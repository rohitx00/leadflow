import * as leadService from './lead.service.js';

export const capturePublicLead = async (req, res, next) => {
  try {
    const lead = await leadService.createPublicLead(req.body);
    res.status(201).json({
      success: true,
      message: 'Lead captured successfully',
      data: { id: lead.id } 
    });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req, res, next) => {
  try {
    const leads = await leadService.getLeads();
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    next(error);
  }
};

export const getLeadById = async (req, res, next) => {
  try {
    const lead = await leadService.getLeadById(req.params.id);
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    next(error);
  }
};

export const updateLead = async (req, res, next) => {
  try {
    const updatedLead = await leadService.updateLead(req.params.id, req.body);
    res.status(200).json({ success: true, data: updatedLead });
  } catch (error) {
    next(error);
  }
};

export const deleteLead = async (req, res, next) => {
  try {
    await leadService.deleteLead(req.params.id);
    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const addNote = async (req, res, next) => {
  try {
    const note = await leadService.addNote(req.params.id, req.user.id, req.body.content);
    res.status(201).json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
};
