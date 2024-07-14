import pkg from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

import { createUser, readUser } from './core/user';

const { json } = pkg;

dotenv.config();

const app: Express = express();
app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.send('NodeJS + Express + TypeScript Server');
});

app.get('/user', readUser);
app.post('/user', createUser);

export default app;
