import { http } from '@/services';
import type { PaginatedResponse, ApiResponse, QueryParams } from '@/types';
import type { Order, CreateOrderPayload, OrderStatus } from '../types';

const BASE = '/orders';

export const orderApi = {
  getOrders: async (params?: QueryParams): Promise<PaginatedResponse<Order>> => {
    const { data } = await http.get<PaginatedResponse<Order>>(BASE, { params });
    return data;
  },

  getOrder: async (id: string): Promise<Order> => {
    const { data } = await http.get<ApiResponse<Order>>(`${BASE}/${id}`);
    return data.data;
  },

  createOrder: async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await http.post<ApiResponse<Order>>(BASE, payload);
    return data.data;
  },

  updateStatus: async (id: string, status: OrderStatus): Promise<Order> => {
    const { data } = await http.patch<ApiResponse<Order>>(`${BASE}/${id}/status`, { status });
    return data.data;
  },
};
