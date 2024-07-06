import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import pkg from 'body-parser';
const { json } = pkg;

dotenv.config();

const app: Express = express();
app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.send('NodeJS + Express + TypeScript Server');
});

export default app;
