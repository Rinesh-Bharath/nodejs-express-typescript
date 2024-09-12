import pkg from 'body-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import Helmet from 'helmet';
import pinoHttp from 'pino-http';

import userRouter from './core/user/router';
import { rateLimiter } from './middleware/rate-limiter';
import { httpLogger as logger } from './shared/logger';

const { json } = pkg;

dotenv.config();

const app: Express = express();
app.use(Helmet());
app.use(json());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));
app.use(rateLimiter);
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
