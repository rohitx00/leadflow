import { Router } from 'express';
import * as leadController from './lead.controller.js';
import { validate } from '../../middleware/validate.js';
import { createPublicLeadSchema, updateLeadSchema } from './lead.validation.js';
import rateLimit from 'express-rate-limit';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';

const router = Router();

const publicLeadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again after 15 minutes',
    },
  },
});

// Public Endpoint
router.post(
  '/public',
  publicLeadLimiter,
  validate(createPublicLeadSchema),
  leadController.capturePublicLead
);

// Protected Endpoints
router.use(authenticate);

router.get('/', leadController.getLeads);
router.get('/:id', leadController.getLeadById);
router.patch('/:id', validate(updateLeadSchema), leadController.updateLead);

// Only ADMIN can delete leads
router.delete('/:id', authorize(['ADMIN']), leadController.deleteLead);

export default router;
