'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryApi } from '../api';
import type { AdjustInventoryPayload } from '../types';
import type { QueryParams } from '@/types';

const INVENTORY_KEY = ['inventory'] as const;

export function useInventory(params?: QueryParams) {
  return useQuery({
    queryKey: [...INVENTORY_KEY, params],
    queryFn: () => inventoryApi.getInventory(params),
  });
}

export function useAdjustInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AdjustInventoryPayload) => inventoryApi.adjustInventory(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVENTORY_KEY });
    },
  });
}
