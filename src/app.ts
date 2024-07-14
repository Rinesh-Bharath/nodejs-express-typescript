import pkg from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import pinoHttp from 'pino-http';

import { createUser, readUser } from './core/user';
import { httpLogger as logger } from './shared/logger';

const { json } = pkg;

dotenv.config();

const app: Express = express();
app.use(json());
app.use(pinoHttp({ logger }));

app.get('/', (req: Request, res: Response) => {
  res.send('NodeJS + Express + TypeScript + Docker Server');
});

app.get('/user', readUser);
app.post('/user', createUser);

export default app;
