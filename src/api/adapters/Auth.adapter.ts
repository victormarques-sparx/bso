import { api } from '@/services';
import type {
  LoginFormDataProps,
  LoginResponseProps,
  RegisterFormDataProps,
} from '../types/Auth.types';

class AuthAdapterClass {
  async login(body: LoginFormDataProps): Promise<LoginResponseProps> {
    const response = await api.post<LoginResponseProps>('/auth/login', body);
    return response.data;
  }

  async register(_body: RegisterFormDataProps): Promise<void> {
    await api.post('/auth/register', _body);
  }
}

export const authAdapter = new AuthAdapterClass();
