import { envs } from '@config';
import express from 'express';

import userRoutes from '@/modules/users/user.routes';

const app = express();
app.use(express.json());

app.use('/users', userRoutes);

const PORT = envs.port || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
