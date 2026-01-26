'use client';

import type { UserProps } from '@/api';
import { CookieConstant } from '@/constants';
import Cookie from 'js-cookie';

// ==============================================
// Token
// ==============================================
export function getTokenCookie(): string | undefined {
  return Cookie.get(CookieConstant.authToken);
}

export function setTokenCookie(value: string): string | undefined {
  return Cookie.set(CookieConstant.authToken, value);
}

export function removeTokenCookie(): void {
  return Cookie.remove(CookieConstant.authToken);
}

// ==============================================
// User
// ==============================================
export function getUserCookie(): UserProps | undefined {
  return Cookie.get(CookieConstant.user)
    ? JSON.parse(Cookie.get(CookieConstant.user) as string)
    : undefined;
}

export function setUserCookie(value: UserProps): string | undefined {
  return Cookie.set(CookieConstant.user, JSON.stringify(value));
}

export function removeUserCookie(): void {
  return Cookie.remove(CookieConstant.user);
}
