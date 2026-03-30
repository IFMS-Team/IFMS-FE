'use client';

import { Table, Button } from '@/shared/components';
import type { Column } from '@/shared/components';
import type { Product } from '../types';
import { formatPrice, getStatusColor } from '../utils';
import { useDeleteProduct } from '../hooks';

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
}

export function ProductTable({ products, isLoading, onEdit }: ProductTableProps) {
  const deleteProduct = useDeleteProduct();

  const columns: Column<Product>[] = [
    {
      key: 'name',
      header: 'Product',
      render: (product) => (
        <div>
          <p className="font-medium text-gray-900">{product.name}</p>
          <p className="text-xs text-gray-500">{product.sku}</p>
        </div>
      ),
    },
    {
      key: 'category',
      header: 'Category',
    },
    {
      key: 'price',
      header: 'Price',
      render: (product) => formatPrice(product.price),
    },
    {
      key: 'quantity',
      header: 'Stock',
      render: (product) => (
        <span className={product.quantity < 10 ? 'font-medium text-red-600' : 'text-gray-900'}>
          {product.quantity}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (product) => (
        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(product.status)}`}>
          {product.status}
        </span>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: (product) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => onEdit(product)}>
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            isLoading={deleteProduct.isPending}
            onClick={() => deleteProduct.mutate(product.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table<Product>
      columns={columns}
      data={products}
      keyExtractor={(p) => p.id}
      isLoading={isLoading}
      emptyMessage="No products found. Add your first product to get started."
    />
  );
}
