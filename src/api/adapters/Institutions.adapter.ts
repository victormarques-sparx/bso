import { api } from '@/services';
import type { RegisterInstitutionPayloadProps } from '../types';

class InstitutionsAdapterClass {
  async register(body: RegisterInstitutionPayloadProps): Promise<void> {
    await api.post('/api/institutions', body);
  }
}

export const institutionsAdapter = new InstitutionsAdapterClass();
