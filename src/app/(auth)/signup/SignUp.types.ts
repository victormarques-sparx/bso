import type { z } from 'zod';
import type { SignUpSchema } from './SignUp.schema';

export type SignUpFormDataTypes = z.infer<typeof SignUpSchema>;
