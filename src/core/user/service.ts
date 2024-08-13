import { ulid } from 'ulid';

import { connectDB } from '../../repository/mongodb/init';
import { IUser, User } from '../../repository/mongodb/user';
import { CustomError } from '../../shared/error/custom-error';
import { Status } from '../../shared/error/status.enum';
import { errorLogger as logger } from '../../shared/logger';
import { CreateUserRequestSchema } from './validation/types/createUserTypes';
import { ReadUserRequestSchema } from './validation/types/readUserTypes';

export async function createUserService(request: CreateUserRequestSchema): Promise<IUser> {
  try {
    await connectDB();
    const user: IUser = await User.create({
      userId: request.userId || ulid(),
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
    });
    return user;
  } catch (error) {
    logger.error(error, `An error occurred while creating the resource`);
    throw error;
  }
}

export async function readUserService(request: ReadUserRequestSchema): Promise<IUser | null> {
  try {
    await connectDB();
    const query: { userId?: string } = {};
    if (request.userId) {
      query.userId = request.userId;
    }
    if (!Object.keys(query).length) {
      throw new CustomError(Status.Error, 'Invalid query');
    }
    const user: IUser | null = await User.findOne(query);
    return user;
  } catch (error) {
    logger.error(error, `An error occurred while reading the resource`);
    throw error;
  }
}
