import { envs } from '@config';
import express from 'express';

import userRoutes from '@/modules/users/user.routes';
import transactionsRoutes from '@/modules/transactions/transactions.routes';

const app = express();
app.use(express.json());

// cors
const corstOptions = {
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', corstOptions.origin);
    res.header('Access-Control-Allow-Methods', corstOptions.methods.join(', '));
    res.header(
        'Access-Control-Allow-Headers',
        corstOptions.allowedHeaders.join(', ')
    );
    next();
});

app.use('/users', userRoutes);
app.use('/transactions', transactionsRoutes);

const PORT = envs.port || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
