import { z } from 'zod';

export const CreateUserValidationSchema = z.object({
  userId: z.string().ulid({ message: 'Invalid userId' }).optional(),
  email: z.string().email({ message: 'Invalid email address' }),
  firstName: z.string(),
  lastName: z.string(),
});
