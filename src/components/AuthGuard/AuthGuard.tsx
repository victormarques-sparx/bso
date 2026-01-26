'use client';

import {
  getTokenCookie,
  getUserCookie,
  onLogout,
  validateToken,
} from '@/services';
import { usePathname } from 'next/navigation';
import { useEffect, type JSX, type PropsWithChildren } from 'react';

export const AuthGuard = ({ children }: PropsWithChildren): JSX.Element => {
  const pathname = usePathname();

  useEffect(() => {
    const isAuthRoute =
      pathname?.startsWith('/bso-web/signin') ||
      pathname?.startsWith('/bso-web/signup');

    // Se está em rota de área logada (não é rota de auth)
    if (!isAuthRoute) {
      const token = getTokenCookie();
      const user = getUserCookie();

      // Se não tem token ou user, faz logout
      if (!token || !user) {
        onLogout();
        return;
      }

      // Valida o token (já faz logout automaticamente se inválido)
      validateToken();
    }
  }, [pathname]);

  return <>{children}</>;
};
