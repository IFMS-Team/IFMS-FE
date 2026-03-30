import { http } from '@/services';
import type { PaginatedResponse, ApiResponse, QueryParams } from '@/types';
import type { InventoryItem, AdjustInventoryPayload, InventoryAdjustment } from '../types';

const BASE = '/inventory';

export const inventoryApi = {
  getInventory: async (params?: QueryParams): Promise<PaginatedResponse<InventoryItem>> => {
    const { data } = await http.get<PaginatedResponse<InventoryItem>>(BASE, { params });
    return data;
  },

  adjustInventory: async (payload: AdjustInventoryPayload): Promise<InventoryAdjustment> => {
    const { data } = await http.post<ApiResponse<InventoryAdjustment>>(`${BASE}/adjust`, payload);
    return data.data;
  },
};
