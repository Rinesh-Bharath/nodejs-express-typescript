import { z } from 'zod';

import { ReadUserValidationSchema } from '../schemas/readUserSchema';

export type ReadUserRequestSchema = z.infer<typeof ReadUserValidationSchema>;
