'use client';

import {
  getTokenCookie,
  getUserCookie,
  onLogout,
  validateToken,
} from '@/services';
import { usePathname } from 'next/navigation';
import { useEffect, type JSX, type PropsWithChildren } from 'react';

/** usePathname() retorna o path SEM basePath (ex.: /signin, não /bso-web/signin) */
const isAuthRoute = (path: string | null): boolean => {
  if (path == null) return false;
  return path.startsWith('/signin') || path.startsWith('/signup');
};

export const AuthGuard = ({ children }: PropsWithChildren): JSX.Element => {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname == null) return;
    if (isAuthRoute(pathname)) return;

    // Se está em rota de área logada (não é rota de auth)
    const token = getTokenCookie();
    const user = getUserCookie();

    if (!token || !user) {
      onLogout();
      return;
    }

    validateToken();
  }, [pathname]);

  return <>{children}</>;
};
