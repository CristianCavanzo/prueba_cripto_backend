import { Router } from 'express';

import { UserController } from './users.controller';

const userController = new UserController();
const router = Router();

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

export default router;
