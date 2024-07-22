import { z } from 'zod';

import { CreateUserRequest, ReadUserRequest } from './interface';

export function createUserValidation(body: any): asserts body is CreateUserRequest {
  try {
    const schema = z.object({
      userId: z.string().ulid({ message: 'Invalid userId' }).optional(),
      email: z.string().email({ message: 'Invalid email address' }),
      firstName: z.string(),
      lastName: z.string(),
    });
    schema.parse(body);
  } catch (error) {
    throw error;
  }
}

export function readUserValidation(query: any): asserts query is ReadUserRequest {
  try {
    const { userId } = query;
    const schema = z.string().ulid({ message: 'Invalid userId' });
    schema.parse(userId);
  } catch (error) {
    throw error;
  }
}
