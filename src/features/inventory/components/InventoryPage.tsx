'use client';

import { Table, Input } from '@/shared/components';
import type { Column } from '@/shared/components';
import { ErrorBoundary } from '@/shared/components';
import { useInventory } from '../hooks';
import { useInventoryStore } from '../store';
import { getStockStatus, getStockStatusColor } from '../utils';
import type { InventoryItem } from '../types';

export function InventoryPage() {
  const { filters, setFilters } = useInventoryStore();
  const { data, isLoading } = useInventory(filters);

  const columns: Column<InventoryItem>[] = [
    { key: 'productName', header: 'Product' },
    { key: 'sku', header: 'SKU' },
    { key: 'location', header: 'Location' },
    {
      key: 'quantity',
      header: 'Quantity',
      render: (item) => <span className="font-medium">{item.quantity}</span>,
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => {
        const status = getStockStatus(item.quantity, item.reorderLevel);
        return (
          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStockStatusColor(status)}`}>
            {status}
          </span>
        );
      },
    },
  ];

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="mt-1 text-sm text-gray-500">Track stock levels and inventory movements.</p>
        </div>

        <div className="w-80">
          <Input
            placeholder="Search inventory..."
            value={filters.search ?? ''}
            onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
          />
        </div>

        <Table<InventoryItem>
          columns={columns}
          data={data?.data ?? []}
          keyExtractor={(i) => i.id}
          isLoading={isLoading}
          emptyMessage="No inventory items found."
        />
      </div>
    </ErrorBoundary>
  );
}
