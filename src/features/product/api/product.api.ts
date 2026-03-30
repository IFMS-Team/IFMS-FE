import { http } from '@/services';
import type { ApiResponse, PaginatedResponse } from '@/types';
import type { Product, CreateProductPayload, UpdateProductPayload, ProductFilters } from '../types';

const BASE = '/products';

export const productApi = {
  getProducts: async (filters?: ProductFilters): Promise<PaginatedResponse<Product>> => {
    const { data } = await http.get<PaginatedResponse<Product>>(BASE, { params: filters });
    return data;
  },

  getProduct: async (id: string): Promise<Product> => {
    const { data } = await http.get<ApiResponse<Product>>(`${BASE}/${id}`);
    return data.data;
  },

  createProduct: async (payload: CreateProductPayload): Promise<Product> => {
    const { data } = await http.post<ApiResponse<Product>>(BASE, payload);
    return data.data;
  },

  updateProduct: async (id: string, payload: UpdateProductPayload): Promise<Product> => {
    const { data } = await http.patch<ApiResponse<Product>>(`${BASE}/${id}`, payload);
    return data.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await http.delete(`${BASE}/${id}`);
  },
};
