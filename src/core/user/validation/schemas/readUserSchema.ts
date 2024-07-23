import { z } from 'zod';

export const ReadUserValidationSchema = z.object({
  userId: z.string().ulid({ message: 'Invalid userId' }),
});
