import { Router } from 'express';

import { TransactionsController } from './transactions.controller';

const transactionController = new TransactionsController();
const router = Router();

router.post('/create', transactionController.create);
router.get('/:user_id', transactionController.getAllByIdUser);
router.patch(
    '/updateStatus/:transaction_id',
    transactionController.updateStatus
);
router.get('/', transactionController.getAll);

export default router;
