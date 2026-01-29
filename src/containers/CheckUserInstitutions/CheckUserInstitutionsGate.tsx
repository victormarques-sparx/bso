'use client';

import { usePathname } from 'next/navigation';
import { type JSX } from 'react';
import { CheckUserInstitutions } from './CheckUserInstitutions';

/** usePathname() retorna o path sem basePath (ex.: /signin) */
const isAuthRoute = (path: string | null): boolean => {
  if (path == null) return true;
  return path.startsWith('/signin') || path.startsWith('/signup');
};

/**
 * Só monta CheckUserInstitutions fora de signin/signup.
 * Evita chamar useCountries, useMyProfile etc. nas telas de auth.
 */
export const CheckUserInstitutionsGate = (): JSX.Element | null => {
  const pathname = usePathname();
  if (isAuthRoute(pathname)) return null;
  return <CheckUserInstitutions />;
};
