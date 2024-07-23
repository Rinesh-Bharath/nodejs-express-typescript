import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { CustomError } from '../../shared/error/custom-error';
import { Message } from '../../shared/error/message.enum';
import { Status } from '../../shared/error/status.enum';
import { errorLogger as logger } from '../../shared/logger';
import { ControllerResult } from '../../shared/result/controller-result.interface';
import { createUserService, readUserService } from './service';
import { CreateUserRequestSchema } from './validation/types/createUserTypes';
import { ReadUserRequestSchema } from './validation/types/readUserTypes';
import { createUserValidation, readUserValidation } from './validation/validate';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    createUserValidation(req.body);

    const user = await createUserService(req.body as CreateUserRequestSchema);

    const result: ControllerResult<typeof user> = {
      status: 200,
      message: 'User created successfully',
      data: user,
    };
    return res.status(200).json(result);
  } catch (error: any) {
    if (error instanceof ZodError) {
      logger.error(error.issues, Message.Validation);
      return next(new CustomError(Status.BadRequest, Message.Validation, error.issues));
    } else if (error instanceof CustomError) {
      return next(error);
    } else {
      logger.error(error, error.message);
      return next(new CustomError(Status.Error, Message.Server));
    }
  }
}

export async function readUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    readUserValidation(req.query);

    const user = await readUserService(req.query as ReadUserRequestSchema);

    if (!user) {
      return next(new CustomError(Status.NotFound, 'User not found'));
    }

    const result: ControllerResult<typeof user> = {
      status: 200,
      message: 'User retrieved successfully',
      data: user,
    };
    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      logger.error(error.issues, Message.Validation);
      return next(new CustomError(Status.BadRequest, Message.Validation, error.issues));
    } else if (error instanceof CustomError) {
      return next(error);
    } else {
      logger.error(error, Message.Server);
      return next(new CustomError(Status.Error, Message.Server));
    }
  }
}
