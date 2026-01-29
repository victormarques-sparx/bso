import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { BASE_PATH, CookieConstant } from './src/constants';
import { isTokenExpired } from './src/services/validateToken';

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // Ignora arquivos estáticos e rotas internas do Next.js
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot)$/)
  ) {
    return NextResponse.next();
  }

  // Rotas de autenticação
  const isAuthRoute =
    pathname.startsWith(`${BASE_PATH}/signin`) ||
    pathname.startsWith(`${BASE_PATH}/signup`);

  // Se está em rota de área logada (não é rota de auth)
  if (!isAuthRoute) {
    const token = request.cookies.get(CookieConstant.authToken)?.value;
    const user = request.cookies.get(CookieConstant.user)?.value;

    // Se não tem token ou user, faz logout (limpa cookies e redireciona)
    if (!token || !user) {
      const response = NextResponse.redirect(
        new URL(`${BASE_PATH}/signin`, request.url)
      );
      response.cookies.delete(CookieConstant.authToken);
      response.cookies.delete(CookieConstant.user);
      return response;
    }

    // Verifica se token está válido
    const isAuthenticated = !isTokenExpired(token);

    // Se token existe mas está inválido, faz logout (limpa cookies)
    if (!isAuthenticated) {
      const response = NextResponse.redirect(
        new URL(`${BASE_PATH}/signin`, request.url)
      );
      response.cookies.delete(CookieConstant.authToken);
      response.cookies.delete(CookieConstant.user);
      return response;
    }

    // Permite acesso às rotas autenticadas
    return NextResponse.next();
  }

  // Se está em rota de auth, verifica se está logado para redirecionar
  const token = request.cookies.get(CookieConstant.authToken)?.value;
  const isAuthenticated = token ? !isTokenExpired(token) : false;

  if (isAuthenticated) {
    // Se tentar acessar rotas de auth estando logado, redireciona para home
    const url = new URL(BASE_PATH, request.url);
    return NextResponse.redirect(url);
  }

  // Permite acesso apenas a rotas de auth quando não está logado
  return NextResponse.next();
}

/*
 * Nota: Com `output: 'export'` (build estático), middleware não é suportado.
 * Este proxy pode ser usado em um servidor customizado (ex.: reverse proxy).
 * Se migrar para middleware, criar `middleware.ts` e usar matcher estático, ex.:
 *   matcher: ['/bso-web/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
 */
