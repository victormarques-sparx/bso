import { z } from 'zod';

export interface CheckUserInstitutionsFormDataTypes {
  legalName: string;
  dbaName: string;
  phone: string;
  taxId: string;
  institutionType: string;
  country: string;
  state: string;
  city: string;
}

export const CheckUserInstitutionsSchema = z.object({
  legalName: z.string().min(1, { message: 'Legal Name is required' }),
  dbaName: z.string().min(1, { message: 'DBA Name is required' }),
  phone: z.string().min(1, { message: 'Phone is required' }),
  taxId: z.string().min(1, { message: 'Tax ID is required' }),
  institutionType: z
    .string()
    .min(1, { message: 'Institution Type is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  city: z.string().min(1, { message: 'City is required' }),
});
