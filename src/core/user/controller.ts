import { NextFunction, Request, Response } from 'express';
import { createUserService, readUserService } from './service';
import { errorLogger as logger } from '../../shared/logger';
import { CustomError } from '../../shared/error/custom-error';
import { ControllerResult } from '../../shared/result/controller-result.interface';

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { email, firstName, lastName } = req.body;

    const user = await createUserService(email, firstName, lastName);

    const result: ControllerResult<typeof user> = {
      status: 200,
      message: 'User created successfully',
      data: user,
    };
    return res.status(200).json(result);
  } catch (error) {
    logger.error(error, 'Create user failed in controller');
    next(new CustomError(500, 'Internal server error'));
  }
}

export async function readUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return next(new CustomError(400, 'Missing or invalid query params: userId'));
    }

    const user = await readUserService(userId);

    if (!user) {
      return next(new CustomError(404, 'User not found'));
    }

    const result: ControllerResult<typeof user> = {
      status: 200,
      message: 'User retrieved successfully',
      data: user,
    };
    return res.status(200).json(result);
  } catch (error) {
    logger.error(error, 'Read user failed in controller');
    next(new CustomError(500, 'Internal server error'));
  }
}
