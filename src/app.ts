import express, { Request, Response } from 'express';
const app = express();
app.use(express.json());

console.log(process.env.DATABASE_URL);

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
