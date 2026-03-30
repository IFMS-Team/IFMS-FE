import { create } from 'zustand';
import type { QueryParams } from '@/types';

interface InventoryStore {
  filters: QueryParams;
  setFilters: (filters: Partial<QueryParams>) => void;
  resetFilters: () => void;
}

export const useInventoryStore = create<InventoryStore>()((set) => ({
  filters: { page: 1, limit: 10 },
  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: { page: 1, limit: 10 } }),
}));
