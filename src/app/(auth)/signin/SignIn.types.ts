import type { z } from 'zod';
import type { SignInSchema } from './SignIn.schema';

export type SignInFormDataTypes = z.infer<typeof SignInSchema>;
