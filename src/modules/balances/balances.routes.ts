import { Router } from 'express';

import { BalancesController } from './balances.controller';

const balancesController = new BalancesController();
const router = Router();

export default router;
