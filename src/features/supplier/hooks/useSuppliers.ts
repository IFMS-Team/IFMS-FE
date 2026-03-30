'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supplierApi } from '../api';
import type { CreateSupplierPayload, UpdateSupplierPayload } from '../types';
import type { QueryParams } from '@/types';

const SUPPLIERS_KEY = ['suppliers'] as const;

export function useSuppliers(params?: QueryParams) {
  return useQuery({
    queryKey: [...SUPPLIERS_KEY, params],
    queryFn: () => supplierApi.getSuppliers(params),
  });
}

export function useSupplier(id: string) {
  return useQuery({
    queryKey: [...SUPPLIERS_KEY, id],
    queryFn: () => supplierApi.getSupplier(id),
    enabled: !!id,
  });
}

export function useCreateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSupplierPayload) => supplierApi.createSupplier(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIERS_KEY });
    },
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateSupplierPayload }) =>
      supplierApi.updateSupplier(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIERS_KEY });
    },
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => supplierApi.deleteSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUPPLIERS_KEY });
    },
  });
}
