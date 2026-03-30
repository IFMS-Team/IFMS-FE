import { http } from '@/services';
import type { ApiResponse } from '@/types';
import type { LoginPayload, RegisterPayload, AuthResponse } from '../types';

const BASE = '/auth';

export const authApi = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await http.post<ApiResponse<AuthResponse>>(`${BASE}/login`, payload);
    return data.data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await http.post<ApiResponse<AuthResponse>>(`${BASE}/register`, payload);
    return data.data;
  },

  logout: async (): Promise<void> => {
    await http.post(`${BASE}/logout`);
  },

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const { data } = await http.post<ApiResponse<{ accessToken: string }>>(`${BASE}/refresh`, {
      refreshToken,
    });
    return data.data;
  },
};
