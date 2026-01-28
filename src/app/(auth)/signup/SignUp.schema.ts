import { z } from 'zod';

const usernamePattern = /^[a-z0-9._-]+$/;

export const SignUpSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First Name is required' })
    .max(20, { message: 'First Name must have at most 20 characters' }),
  lastName: z
    .string()
    .min(1, { message: 'Last Name is required' })
    .max(20, { message: 'Last Name must have at most 20 characters' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address' })
    .max(100, { message: 'Email must have at most 100 characters' }),
  phone: z.string(),
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(20, { message: 'Username must have at most 20 characters' })
    .regex(usernamePattern, {
      message:
        'Username can only contain lowercase letters, numbers, and . _ -',
    }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(10, { message: 'Password must have between 10 and 32 characters' })
    .max(32, { message: 'Password must have between 10 and 32 characters' }),
});
