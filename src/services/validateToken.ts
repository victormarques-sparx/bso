import { jwtDecode } from 'jwt-decode';
import { getTokenCookie } from './cookies';
import { onLogout } from './logout';

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return !decoded?.exp || decoded.exp <= currentTime;
  } catch {
    return true;
  }
};

export const validateToken = (): boolean => {
  const token = getTokenCookie();
  if (!token) {
    // Se não há token, não faz logout (usuário já não está logado)
    return false;
  }

  const isValid = !isTokenExpired(token);

  // Se token existe mas está inválido, faz logout
  if (!isValid) {
    onLogout();
  }

  return isValid;
};
