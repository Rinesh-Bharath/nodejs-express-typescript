import { z } from 'zod';

import { CreateUserValidationSchema } from '../schemas/createUserSchema';

export type CreateUserRequestSchema = z.infer<typeof CreateUserValidationSchema>;
