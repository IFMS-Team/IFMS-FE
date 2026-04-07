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
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  password: string;
}
