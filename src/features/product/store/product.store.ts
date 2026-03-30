import { create } from 'zustand';
import type { ProductFilters } from '../types';

interface ProductStore {
  filters: ProductFilters;
  selectedProductId: string | null;

  setFilters: (filters: Partial<ProductFilters>) => void;
  resetFilters: () => void;
  selectProduct: (id: string | null) => void;
}

const defaultFilters: ProductFilters = {
  page: 1,
  limit: 10,
  search: '',
};

export const useProductStore = create<ProductStore>()((set) => ({
  filters: defaultFilters,
  selectedProductId: null,

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters, page: filters.page ?? 1 },
    })),

  resetFilters: () => set({ filters: defaultFilters }),

  selectProduct: (id) => set({ selectedProductId: id }),
}));
