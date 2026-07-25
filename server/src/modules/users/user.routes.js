import { Router } from 'express';
import * as userController from './user.controller.js';
import { validate } from '../../middleware/validate.js';
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { createUserSchema, updateRoleSchema, updateStatusSchema } from './user.validation.js';

const router = Router();

// Only ADMIN can manage users
router.use(authenticate, authorize('ADMIN'));

router.post('/', validate(createUserSchema), userController.createUser);
router.get('/', userController.getUsers);
router.patch('/:id/role', validate(updateRoleSchema), userController.updateUserRole);
router.patch('/:id/status', validate(updateStatusSchema), userController.updateUserStatus);
router.delete('/:id', userController.deleteUser);

export default router;
