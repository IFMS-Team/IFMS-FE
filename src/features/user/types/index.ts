export type UserStatus = 'Enable' | 'Disable';

export interface UserProfileRaw {
  user_id: string;
  username: string;
  full_name: string;
  email: string;
  status: UserStatus;
  phone: string;
  address: string;
  cccd: string;
  role_id: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  username: string;
  fullName: string;
  email: string;
  status: UserStatus;
  phone: string;
  address: string;
  cccd: string;
  roleId: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export function mapUserProfile(raw: UserProfileRaw): UserProfile {
  return {
    id: raw.user_id,
    username: raw.username,
    fullName: raw.full_name,
    email: raw.email,
    status: raw.status,
    phone: raw.phone,
    address: raw.address,
    cccd: raw.cccd,
    roleId: raw.role_id,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export interface CreateUserPayload {
  username: string;
  full_name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  cccd?: string;
  role_id?: string;
}

export interface UpdateUserPayload {
  full_name?: string;
  email?: string;
  phone?: string;
  address?: string;
  role_id?: string;
}
