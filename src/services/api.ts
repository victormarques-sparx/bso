import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { jwtDecode } from 'jwt-decode';
import { getTokenCookie } from './cookies';
import { onLogout } from './logout';

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<{ exp?: number }>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return !decoded?.exp || decoded.exp <= currentTime;
  } catch {
    return true;
  }
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getTokenCookie();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Excluir parametros vazios
    if (config.params) {
      const cleanParams = Object.fromEntries(
        Object.entries(config.params).filter(([_, value]) => {
          return value !== undefined && value !== '' && value !== null;
        })
      );
      config.params = cleanParams;
    }

    return config;
  },
  (error: AxiosError) => error
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      const token = getTokenCookie() || '';
      const logged = token ? !isTokenExpired(token) : false;

      if (token && !logged) {
        onLogout();
      }
    }

    return Promise.reject(error);
  }
);
