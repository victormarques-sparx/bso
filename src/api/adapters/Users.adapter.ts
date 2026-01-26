import { api } from '@/services';
import type { UserProps } from '../types';

class UsersAdapterClass {
  async myProfile(): Promise<UserProps> {
    const response = await api.get<UserProps>('/api/users/my-profile');

    return response.data;
  }
}

export const usersAdapter = new UsersAdapterClass();
