'use client';

import { useState, useCallback } from 'react';
import { Button, Input, Modal } from '@/shared/components';
import { ErrorBoundary } from '@/shared/components';
import { useProducts } from '../hooks';
import { useProductStore } from '../store';
import { ProductTable } from './ProductTable';
import type { Product } from '../types';

export function ProductPage() {
  const { filters, setFilters } = useProductStore();
  const { data, isLoading } = useProducts(filters);
  const [isModalOpen, setModalOpen] = useState(false);
  const [_selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleSearch = useCallback(
    (value: string) => {
      setFilters({ search: value, page: 1 });
    },
    [setFilters],
  );

  const handleEdit = useCallback((product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  }, []);

  const handlePageChange = useCallback(
    (page: number) => {
      setFilters({ page });
    },
    [setFilters],
  );

  const products = data?.data ?? [];
  const meta = data?.meta;

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your product catalog and inventory levels.
            </p>
          </div>
          <Button onClick={() => setModalOpen(true)}>Add Product</Button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-80">
            <Input
              placeholder="Search products..."
              value={filters.search ?? ''}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <ProductTable products={products} isLoading={isLoading} onEdit={handleEdit} />

        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              Showing page {meta.page} of {meta.totalPages} ({meta.total} total items)
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                disabled={meta.page <= 1}
                onClick={() => handlePageChange(meta.page - 1)}
              >
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={meta.page >= meta.totalPages}
                onClick={() => handlePageChange(meta.page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
          }}
          title="Product"
          size="lg"
        >
          <p className="text-sm text-gray-500">Product form placeholder — wire up as needed.</p>
        </Modal>
      </div>
    </ErrorBoundary>
  );
}
