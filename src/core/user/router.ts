import express, { Router } from 'express';

import { errorHandler } from '../../middleware/error-handler';
import { timeLog } from '../../middleware/time-log';
import { createUser, readUser } from './controller';

const router: Router = express.Router();

// Define route handlers
router.post('/', createUser);
router.get('/', readUser);

// Error handling middleware should be the last middleware added
router.use(errorHandler);

export default router;
