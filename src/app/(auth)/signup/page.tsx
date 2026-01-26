'use client';

import { Container, InputPassword, TextField } from '@/components';
import { api } from '@/services';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SignUpSchema } from './SignUp.schema';
import { type SignUpFormDataTypes } from './SignUp.types';

export default function SignupPage(): JSX.Element {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormDataTypes>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignUpFormDataTypes): Promise<void> => {
    try {
      await api.post('/auth/register', data);

      toast.success('Account created successfully');
      resetForm();
      router.push('/signin');
    } catch (error) {
      const errorMessage =
        (error instanceof AxiosError && error.response?.data?.message) ||
        'Failed to create account. Please try again.';

      toast.error(errorMessage);
    }
  };

  return (
    <Container className="py-8">
      <div className="bg-base-200 rounded-2xl p-8">
        <h2 className="mb-8 text-center text-3xl font-semibold">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <TextField
                {...register('firstName')}
                label="First Name"
                name="firstName"
                placeholder="Ex: John"
                maxLength={20}
                error={errors.firstName?.message}
              />

              <TextField
                {...register('lastName')}
                label="Last Name"
                name="lastName"
                placeholder="Ex: Doe"
                maxLength={20}
                error={errors.lastName?.message}
              />
            </div>

            <TextField
              {...register('email')}
              label="Email"
              name="email"
              placeholder="Ex: john.doe@example.com"
              maxLength={100}
              error={errors.email?.message}
            />

            <TextField
              {...register('phone')}
              label="Phone"
              name="phone"
              placeholder="Ex: +1234567890 (optional)"
              error={errors.phone?.message}
            />

            <TextField
              {...register('username')}
              label="Username"
              name="username"
              placeholder="Ex: john.doe"
              maxLength={20}
              error={errors.username?.message}
            />

            <InputPassword
              {...register('password')}
              label="Password"
              name="password"
              placeholder="Ex: *********"
              maxLength={32}
              error={errors.password?.message}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'h-12 w-full rounded-lg px-4 py-2',
              'flex items-center justify-center gap-2',
              'transition-colors duration-300',
              isSubmitting
                ? 'bg-base-300 cursor-not-allowed opacity-50'
                : 'bg-base-300 hover:bg-base-400'
            )}
            aria-busy={isSubmitting}
          >
            <span className="text-base-60 text-sm font-semibold">
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </span>
          </button>
        </form>
      </div>

      <div className="text-base-500 mt-6 text-center text-sm">
        Already have an account?{' '}
        <Link
          href="/signin"
          className="text-base-500 hover:text-base-700 transition-colors duration-300 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </Container>
  );
}
