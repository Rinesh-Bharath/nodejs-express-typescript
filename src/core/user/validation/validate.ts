import { CreateUserValidationSchema } from './schemas/createUserSchema';
import { ReadUserValidationSchema } from './schemas/readUserSchema';
import { CreateUserRequestSchema } from './types/createUserTypes';
import { ReadUserRequestSchema } from './types/readUserTypes';

export function createUserValidation(body: any): asserts body is CreateUserRequestSchema {
  CreateUserValidationSchema.parse(body);
}

export function readUserValidation(query: any): asserts query is ReadUserRequestSchema {
  ReadUserValidationSchema.parse(query);
}
