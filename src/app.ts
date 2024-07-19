import pkg from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import pinoHttp from 'pino-http';
import { httpLogger as logger } from './shared/logger';
import userRouter from './core/user/router';

const { json } = pkg;

dotenv.config();

const app: Express = express();
app.use(json());
app.use(pinoHttp({ logger }));

// Get an instance of the express Router
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('NodeJS + Express + TypeScript + Docker Server');
});

router.use('/user', userRouter);

// Prefix for router
app.use('/', router);

export default app;
