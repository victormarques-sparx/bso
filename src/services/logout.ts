import { removeTokenCookie, removeUserCookie } from './cookies';

const isServer = (): boolean => typeof window === 'undefined';

export const onLogout = (btnLogout?: boolean): void => {
  // Remove apenas os cookies de autenticação
  // Os dados do localStorage (contas, logs, users cadastrados) são mantidos
  removeTokenCookie();
  removeUserCookie();

  // Só executa no cliente (navegador)
  if (!isServer()) {
    // Dispara evento para notificar outros componentes sobre o logout
    window.dispatchEvent(new CustomEvent('auth:logout'));

    const currentURL = `${window.location.pathname}${window.location.search}`;

    const redirectURL = btnLogout
      ? '/bso-web/signin'
      : `/bso-web/signin?redirect=${encodeURIComponent(currentURL)}`;

    window.location.replace(redirectURL);
  }
};
