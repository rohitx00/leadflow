import { z } from 'zod';

export const createPublicLeadSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    company: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST']).optional(),
    assignedToId: z.string().uuid().optional().nullable(),
    firstName: z.string().min(1).optional(),
    lastName: z.string().min(1).optional(),
    email: z.string().email().optional(),
    company: z.string().optional(),
    phone: z.string().optional(),
  }),
});

export const addNoteSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Note content is required'),
  }),
});
