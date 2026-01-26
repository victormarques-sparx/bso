import { removeTokenCookie, removeUserCookie } from './cookies';

const isServer = (): boolean => typeof window === 'undefined';

export const onLogout = (btnLogout?: boolean): void => {
  // Remove apenas os cookies de autenticação
  // Os dados do localStorage (contas, logs, users cadastrados) são mantidos
  removeTokenCookie();
  removeUserCookie();

  // Só executa no cliente (navegador)
  if (!isServer()) {
    const currentURL = `${window.location.pathname}${window.location.search}`;

    const redirectURL = btnLogout
      ? '/signin'
      : `/signin?redirect=${encodeURIComponent(currentURL)}`;

    window.location.replace(redirectURL);
  }
};
