import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import type { ApiError } from '@app-types/api';

export const BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://react-native-challenge-api.tailor-hub.com/api'; //TODO: Later remove this for production

// Token getter — replaced by the auth store at runtime
let _tokenGetter: (() => string | null) | null = null;
let _onUnauthorized: (() => void) | null = null;

export function configureApiClient(opts: {
  tokenGetter: () => string | null;
  onUnauthorized: () => void;
}): void {
  _tokenGetter = opts.tokenGetter;
  _onUnauthorized = opts.onUnauthorized;
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request interceptor: attach Bearer token ─────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = _tokenGetter?.();
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ── Response interceptor: handle 401 + normalize errors ──────
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: unknown) => {
    if (error instanceof AxiosError) {
      const status = error.response?.status;

      if (status === 401) {
        _onUnauthorized?.();
      }

      const apiError: ApiError = {
        error:
          (error.response?.data as ApiError | undefined)?.error ??
          error.message ??
          'An unexpected error occurred',
        statusCode: status,
      };

      return Promise.reject(apiError);
    }
    return Promise.reject(error);
  },
);
