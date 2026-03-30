import { http } from '@/services';
import type { PaginatedResponse, ApiResponse, QueryParams } from '@/types';
import type { UserProfile, CreateUserPayload, UpdateUserPayload } from '../types';

const BASE = '/users';

export const userApi = {
  getUsers: async (params?: QueryParams): Promise<PaginatedResponse<UserProfile>> => {
    const { data } = await http.get<PaginatedResponse<UserProfile>>(BASE, { params });
    return data;
  },

  getUser: async (id: string): Promise<UserProfile> => {
    const { data } = await http.get<ApiResponse<UserProfile>>(`${BASE}/${id}`);
    return data.data;
  },

  createUser: async (payload: CreateUserPayload): Promise<UserProfile> => {
    const { data } = await http.post<ApiResponse<UserProfile>>(BASE, payload);
    return data.data;
  },

  updateUser: async (id: string, payload: UpdateUserPayload): Promise<UserProfile> => {
    const { data } = await http.patch<ApiResponse<UserProfile>>(`${BASE}/${id}`, payload);
    return data.data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await http.delete(`${BASE}/${id}`);
  },
};
