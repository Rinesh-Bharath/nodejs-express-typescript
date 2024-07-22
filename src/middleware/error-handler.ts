import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../shared/error/custom-error';
import { ControllerResult } from '../shared/result/controller-result.interface';

export function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction): Response {
  const result: ControllerResult<any> = {
    status: err.status || 500,
    message: err.message,
    data: err.data,
  };

  return res.status(result.status).json(result);
}
