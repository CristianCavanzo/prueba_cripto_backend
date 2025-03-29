import { Router } from 'express';

import { StatusesController } from './statuses.controller';

const statusesController = new StatusesController();
const router = Router();

export default router;
