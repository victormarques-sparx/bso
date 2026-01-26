import { setUserCookie } from '@/services';
import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { institutionsAdapter, usersAdapter } from '../../adapters';
import type { RegisterInstitutionPayloadProps } from '../../types';

export const useRegisterInstitution = (): UseMutationResult<
  void,
  Error,
  RegisterInstitutionPayloadProps
> => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, RegisterInstitutionPayloadProps>({
    mutationFn: institutionsAdapter.register,
    onSuccess: async () => {
      // Busca o perfil atualizado do usuário
      const updatedUser = await usersAdapter.myProfile();

      // Atualiza o cookie do usuário
      setUserCookie(updatedUser);

      // Atualiza o cache do React Query
      queryClient.setQueryData(['users', 'my-profile'], updatedUser);
      queryClient.invalidateQueries({ queryKey: ['users', 'my-profile'] });

      // Dispara evento para notificar outros componentes sobre a atualização do usuário
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('user:updated'));
      }
    },
  });
};
