import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL } from '@/configs';
import type { ApiError } from '@/types';

const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    const status = error.response?.status;

    const url = error.config?.url ?? '';
    const isAuthRequest = url.includes('/auth/login');

    if (status === 401 && !isAuthRequest && typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }

    const apiError: ApiError = {
      message: error.response?.data?.message ?? error.message ?? 'An unexpected error occurred',
      statusCode: status ?? 500,
      errors: error.response?.data?.errors,
    };

    return Promise.reject(apiError);
  },
);

export default http;
