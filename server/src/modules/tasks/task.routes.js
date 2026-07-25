import { Router } from 'express';
import * as taskController from './task.controller.js';
import { validate } from '../../middleware/validate.js';
import { createTaskSchema, updateTaskSchema } from './task.validation.js';
import { authenticate } from '../../middleware/authenticate.js';

const router = Router();

router.use(authenticate);

// Get my upcoming tasks
router.get('/my-tasks', taskController.getMyTasks);

// Get tasks for a specific lead
router.get('/lead/:leadId', taskController.getLeadTasks);

// Create a new task
router.post('/', validate(createTaskSchema), taskController.createTask);

// Update a task (e.g. mark as completed)
router.patch('/:id', validate(updateTaskSchema), taskController.updateTask);

export default router;
