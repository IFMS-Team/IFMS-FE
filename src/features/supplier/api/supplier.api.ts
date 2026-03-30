import { http } from '@/services';
import type { PaginatedResponse, ApiResponse, QueryParams } from '@/types';
import type { Supplier, CreateSupplierPayload, UpdateSupplierPayload } from '../types';

const BASE = '/suppliers';

export const supplierApi = {
  getSuppliers: async (params?: QueryParams): Promise<PaginatedResponse<Supplier>> => {
    const { data } = await http.get<PaginatedResponse<Supplier>>(BASE, { params });
    return data;
  },

  getSupplier: async (id: string): Promise<Supplier> => {
    const { data } = await http.get<ApiResponse<Supplier>>(`${BASE}/${id}`);
    return data.data;
  },

  createSupplier: async (payload: CreateSupplierPayload): Promise<Supplier> => {
    const { data } = await http.post<ApiResponse<Supplier>>(BASE, payload);
    return data.data;
  },

  updateSupplier: async (id: string, payload: UpdateSupplierPayload): Promise<Supplier> => {
    const { data } = await http.patch<ApiResponse<Supplier>>(`${BASE}/${id}`, payload);
    return data.data;
  },

  deleteSupplier: async (id: string): Promise<void> => {
    await http.delete(`${BASE}/${id}`);
  },
};
