'use client';

import { Container, InputPassword, TextField } from '@/components';
import { api, setTokenCookie, setUserCookie } from '@/services';
import { cn } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type JSX } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SignInSchema } from './SignIn.schema';
import type { SignInFormDataTypes } from './SignIn.types';

export default function SigninPage(): JSX.Element {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormDataTypes>({
    resolver: zodResolver(SignInSchema),
    mode: 'onSubmit',
  });

  const onSubmit = async (data: SignInFormDataTypes): Promise<void> => {
    try {
      const response = await api.post('/auth/login', data);

      setTokenCookie(response.data.token);
      setUserCookie(response.data.user);

      router.push('/');
    } catch (error) {
      const errorMessage =
        (error instanceof AxiosError && error.response?.data?.message) ||
        'Failed to sign in. Please try again.';

      toast.error(errorMessage);
    }
  };

  return (
    <Container className="py-8">
      <div className="bg-base-200 rounded-2xl p-8">
        <h2 className="mb-8 text-center text-3xl font-semibold">Sign In</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8 space-y-4">
            <TextField
              {...register('username')}
              label="Username"
              name="username"
              placeholder="Ex: john.doe"
              error={errors.username?.message}
            />

            <InputPassword
              {...register('password')}
              label="Password"
              name="password"
              placeholder="Enter password"
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
            <span className="text-base-600 text-sm font-semibold">
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </span>
          </button>
        </form>
      </div>

      <div className="text-base-500 mt-6 text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link
          href="/signup"
          className="text-base-500 hover:text-base-700 transition-colors duration-300 hover:underline"
        >
          Sign up
        </Link>
      </div>
    </Container>
  );
}
