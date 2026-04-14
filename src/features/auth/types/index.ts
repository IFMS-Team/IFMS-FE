export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  data: string;
  message: string;
  status: number;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'staff';
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ForgotPasswordPayload {
  username: string;
  email: string;
  phone: string;
  cccd: string;
}

export interface ForgotPasswordResponse {
  data: string;
  message: string;
  status: number;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface VerifyOtpResponse {
  reset_token: string;
  message: string;
  status: number;
}

export interface ResetPasswordPayload {
  reset_token: string;
  new_password: string;
  confirm_password: string;
}

export interface ResetPasswordResponse {
  data: string;
  message: string;
  status: number;
}
