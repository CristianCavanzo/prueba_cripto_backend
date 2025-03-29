import { envs } from '@config';
import express from 'express';

import userRoutes from '@/modules/users/user.routes';
import transactionsRoutes from '@/modules/transactions/transactions.routes';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/transactions', transactionsRoutes);

const PORT = envs.port || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
