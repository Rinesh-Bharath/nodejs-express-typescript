import express, { NextFunction, Request, Response, Router } from 'express';
import { createUser, readUser } from './controller';
import { errorHandler } from '../../middleware/error-handler';
import { timeLog } from '../../middleware/time-log';

const router: Router = express.Router();

// Middleware that logs the request time
router.use(timeLog);

// Define route handlers
router.get('/', readUser);
router.post('/', createUser);

// Error handling middleware should be the last middleware added
router.use(errorHandler);

export default router;
