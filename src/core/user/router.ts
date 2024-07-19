import express, { Router } from 'express';

import { errorHandler } from '../../middleware/error-handler';
import { timeLog } from '../../middleware/time-log';
import { createUser, readUser } from './controller';

const router: Router = express.Router();

// Middleware that logs the request time
router.use(timeLog);

// Define route handlers
router.get('/', readUser);
router.post('/', createUser);

// Error handling middleware should be the last middleware added
router.use(errorHandler);

export default router;
