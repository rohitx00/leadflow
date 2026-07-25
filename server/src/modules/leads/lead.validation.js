import { z } from 'zod';

export const createPublicLeadSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().optional(),
    email: z.string().email('Invalid email address'),
    company: z.string().optional(),
    phone: z.string().min(1, 'Phone number is required'),
    message: z.string().optional(),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'LOST', 'CONVERTED']).optional(),
    source: z.enum(['WEBSITE', 'REFERRAL', 'MANUAL', 'OTHER']).optional(),
    assignedToId: z.string().uuid().optional().nullable(),
    createdById: z.string().uuid().optional().nullable(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    company: z.string().optional(),
    phone: z.string().min(1).optional(),
    message: z.string().optional(),
    externalReference: z.string().optional().nullable(),
  }),
});

export const getLeadsSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'LOST', 'CONVERTED']).optional(),
    assignedToId: z.string().optional(),
  }),
});

export const addNoteSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Note content is required'),
  }),
});
