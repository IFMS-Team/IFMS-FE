import type { ProductStatus } from '../types';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function getStatusColor(status: ProductStatus): string {
  const colors: Record<ProductStatus, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-yellow-100 text-yellow-800',
    discontinued: 'bg-red-100 text-red-800',
  };
  return colors[status];
}
