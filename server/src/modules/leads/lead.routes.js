import { Router } from 'express';
import * as leadController from './lead.controller.js';
import { validate } from '../../middleware/validate.js';
import { createPublicLeadSchema } from './lead.validation.js';
import rateLimit from 'express-rate-limit';

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

router.post(
  '/public',
  publicLeadLimiter,
  validate(createPublicLeadSchema),
  leadController.capturePublicLead
);

export default router;
