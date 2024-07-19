import { Request, Response } from 'express';

import { CustomError } from '../shared/error/custom-error';
import { errorLogger as logger } from '../shared/logger';
import { ControllerResult } from '../shared/result/controller-result.interface';

export function errorHandler(err: CustomError, req: Request, res: Response): Response {
  logger.error(err.message, err);

  const result: ControllerResult<any> = {
    status: err.status || 500,
    message: err.message,
    data: err.data,
  };

  return res.status(result.status).json(result);
}
