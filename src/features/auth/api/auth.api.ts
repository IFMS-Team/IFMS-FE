import { http } from '@/services';
import type {
  LoginPayload, LoginResponse,
  ForgotPasswordPayload, ForgotPasswordResponse,
  VerifyOtpPayload, VerifyOtpResponse,
  ResetPasswordPayload, ResetPasswordResponse,
  RegisterPayload, AuthResponse,
} from '../types';
import type { ApiResponse } from '@/types';

const BASE = '/api/v1/auth';

export const authApi = {
  login: async (payload: LoginPayload): Promise<string> => {
    const { data } = await http.post<LoginResponse>(`${BASE}/login`, payload);
    return data.data;
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<string> => {
    const { data } = await http.post<ForgotPasswordResponse>(`${BASE}/forgot-password`, payload);
    return data.data;
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<string> => {
    const { data } = await http.post<VerifyOtpResponse>(`${BASE}/verify-otp`, payload);
    return data.reset_token;
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<string> => {
    const { data } = await http.post<ResetPasswordResponse>(`${BASE}/reset-password`, payload);
    return data.data;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await http.post<ApiResponse<AuthResponse>>(`${BASE}/register`, payload);
    return data.data;
  },

  logout: async (): Promise<void> => {},

  refreshToken: async (refreshToken: string): Promise<{ accessToken: string }> => {
    const { data } = await http.post<ApiResponse<{ accessToken: string }>>(`${BASE}/refresh`, {
      refreshToken,
    });
    return data.data;
  },
};
