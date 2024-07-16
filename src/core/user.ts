import { Request, Response } from 'express';
import { ulid } from 'ulid';

import { connectDB } from '../repository/mongodb/init';
import { IUser, User } from '../repository/mongodb/user';
import { errorLogger as logger } from '../shared/logger';

export async function createUser(req: Request, res: Response) {
  try {
    const { email, firstName, lastName } = req.body;

    await connectDB();

    const user: IUser = await User.create({
      userId: ulid(),
      email,
      firstName,
      lastName,
    });
    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    logger.error(error, 'Create user failed');
    throw error;
  }
}

export async function readUser(req: Request, res: Response) {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(404).json({
        status: 404,
        message: 'Missing query params: userId',
      });
    }

    await connectDB();

    const user: IUser | null = await User.findOne({
      userId,
    });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 200,
      data: user,
    });
  } catch (error) {
    logger.error(error, 'Read user failed');
    throw error;
  }
}
