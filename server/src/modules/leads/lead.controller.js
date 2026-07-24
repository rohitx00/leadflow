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
