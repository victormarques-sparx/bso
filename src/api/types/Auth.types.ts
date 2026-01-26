import type { UserProps } from '@/types';

export interface LoginFormDataProps {
  username: string;
  password: string;
}

export interface LoginResponseProps {
  token: string;
  user: UserProps;
}

export interface RegisterFormDataProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
}
