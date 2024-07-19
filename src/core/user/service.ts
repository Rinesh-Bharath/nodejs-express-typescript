import { ulid } from 'ulid';
import { connectDB } from '../../repository/mongodb/init';
import { IUser, User } from '../../repository/mongodb/user';
import { errorLogger as logger } from '../../shared/logger';

export async function createUserService(email: string, firstName: string, lastName: string): Promise<IUser> {
  try {
    await connectDB();
    const user: IUser = await User.create({
      userId: ulid(),
      email,
      firstName,
      lastName,
    });
    return user;
  } catch (error) {
    logger.error(error, 'Create user failed in service');
    throw error;
  }
}

export async function readUserService(userId: string): Promise<IUser | null> {
  try {
    await connectDB();
    const user: IUser | null = await User.findOne({ userId });
    return user;
  } catch (error) {
    logger.error(error, 'Read user failed in service');
    throw error;
  }
}
