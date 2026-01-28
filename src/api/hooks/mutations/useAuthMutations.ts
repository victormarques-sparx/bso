'use client';

import { setTokenCookie, setUserCookie } from '@/services';
import {
  useMutation,
  type UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { authAdapter } from '../../adapters';
import type {
  LoginFormDataProps,
  LoginResponseProps,
  RegisterFormDataProps,
} from '../../types';

export const authQueryKeys = {
  user: ['auth', 'user'] as const,
  session: ['auth', 'session'] as const,
};

export const useLogin = (): UseMutationResult<
  LoginResponseProps,
  Error,
  LoginFormDataProps
> => {
  const queryClient = useQueryClient();

  return useMutation<LoginResponseProps, Error, LoginFormDataProps>({
    mutationFn: authAdapter.login,
    onSuccess: data => {
      if (data?.token) setTokenCookie(data.token);
      if (data?.user) setUserCookie(data.user);
      queryClient.setQueryData(authQueryKeys.user, data.user);
      queryClient.setQueryData(authQueryKeys.session, { token: data.token });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.user });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.session });
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('auth:login'));
      }
    },
  });
};

export const useRegister = (): UseMutationResult<
  void,
  Error,
  RegisterFormDataProps
> => {
  return useMutation<void, Error, RegisterFormDataProps>({
    mutationFn: authAdapter.register,
  });
};
