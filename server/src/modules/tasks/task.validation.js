import { z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    dueDate: z.string().datetime(),
    assignedToId: z.string().uuid(),
    leadId: z.string().cuid(),
  }),
});

export const updateTaskSchema = z.object({
  body: z.object({
    isCompleted: z.boolean().optional(),
    title: z.string().min(1).optional(),
    dueDate: z.string().datetime().optional(),
  }),
});
