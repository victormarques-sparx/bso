import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import { institutionsAdapter } from '../../adapters';
import type { RegisterInstitutionPayloadProps } from '../../types';

export const useRegisterInstitution = (): UseMutationResult<
  void,
  Error,
  RegisterInstitutionPayloadProps
> => {
  return useMutation<void, Error, RegisterInstitutionPayloadProps>({
    mutationFn: institutionsAdapter.register,
  });
};
