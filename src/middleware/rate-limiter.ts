import { Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';

import { Status } from '../shared/error/status.enum';
import { ControllerResult } from '../shared/result/controller-result.interface';

const MAX_REQUESTS = 5;
const WINDOW_IN_MS = 60 * 1000;
const WINDOW_DESC = 'minute';

const result: ControllerResult<any> = {
  status: Status.TooMany,
  message: `You have exceeded the rate limit of ${MAX_REQUESTS} requests per ${WINDOW_DESC}!`,
};

export const rateLimiter = rateLimit({
  windowMs: WINDOW_IN_MS,
  max: MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req: Request, res: Response) {
    res.status(Status.TooMany).json(result);
  },
});
