import { Router } from 'express';

import { TransactionsTypesController } from './transactionsTypes.controller';

const transactionsTypeController = new TransactionsTypesController();
const router = Router();

export default router;
