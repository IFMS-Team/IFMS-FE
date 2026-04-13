import { http } from '@/services';
import type { PaginatedResponse, ApiResponse, QueryParams } from '@/types';
import type { UserProfile, UserProfileRaw, CreateUserPayload, UpdateUserPayload } from '../types';
import { mapUserProfile } from '../types';

const BASE = '/api/v1/users';

export const userApi = {
  getMe: async (): Promise<UserProfile> => {
    const { data } = await http.get<ApiResponse<UserProfileRaw>>(`${BASE}/me`);
    return mapUserProfile(data.data);
  },

  getUsers: async (params?: QueryParams): Promise<PaginatedResponse<UserProfile>> => {
    const { data } = await http.get<PaginatedResponse<UserProfileRaw>>(BASE, { params });
    return {
      ...data,
      data: Array.isArray(data.data) ? data.data.map(mapUserProfile) : [],
    } as PaginatedResponse<UserProfile>;
  },

  getUser: async (id: string): Promise<UserProfile> => {
    const { data } = await http.get<ApiResponse<UserProfileRaw>>(`${BASE}/${id}`);
    return mapUserProfile(data.data);
  },

  searchByUsername: async (username: string): Promise<UserProfile[]> => {
    const { data } = await http.get<ApiResponse<UserProfileRaw[]>>(`${BASE}/search`, {
      params: { username },
    });
    return data.data.map(mapUserProfile);
  },

  createUser: async (payload: CreateUserPayload): Promise<UserProfile> => {
    const { data } = await http.post<ApiResponse<UserProfileRaw>>(BASE, payload);
    return mapUserProfile(data.data);
  },

  updateUser: async (id: string, payload: UpdateUserPayload): Promise<UserProfile> => {
    const { data } = await http.put<ApiResponse<UserProfileRaw>>(`${BASE}/${id}`, payload);
    return mapUserProfile(data.data);
  },

  deleteUser: async (id: string): Promise<void> => {
    await http.delete(`${BASE}/${id}`);
  },
};
