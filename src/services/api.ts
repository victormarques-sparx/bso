import axios, {
  type AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { getTokenCookie } from './cookies';
import { isTokenExpired } from './validateToken';
import { onLogout } from './logout';

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
