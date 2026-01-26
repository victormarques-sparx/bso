import type { InstitutionsProps } from './Institutions.types';

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  status: string;
  institutions: InstitutionsProps[];
}
