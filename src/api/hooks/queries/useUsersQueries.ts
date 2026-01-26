import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { usersAdapter } from '../../adapters';
import type { UserProps } from '../../types';

export const useMyProfile = (): UseQueryResult<UserProps, Error> => {
  return useQuery({
    queryKey: ['users', 'my-profile'],
    queryFn: () => usersAdapter.myProfile(),
    retry: false,
    throwOnError: false,
  });
};
