import { envs } from '@config/env';
import express, { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient(); 

const app = express();
app.use(express.json());

const PORT = 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
