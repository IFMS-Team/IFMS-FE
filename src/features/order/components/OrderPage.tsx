'use client';

import { Table, Input, Button } from '@/shared/components';
import type { Column } from '@/shared/components';
import { ErrorBoundary } from '@/shared/components';
import { useOrders } from '../hooks';
import { useOrderStore } from '../store';
import { getOrderStatusColor, formatOrderTotal } from '../utils';
import type { Order } from '../types';

export function OrderPage() {
  const { filters, setFilters } = useOrderStore();
  const { data, isLoading } = useOrders(filters);

  const columns: Column<Order>[] = [
    {
      key: 'orderNumber',
      header: 'Order #',
      render: (order) => <span className="font-medium">{order.orderNumber}</span>,
    },
    { key: 'supplierName', header: 'Supplier' },
    {
      key: 'totalAmount',
      header: 'Total',
      render: (order) => formatOrderTotal(order.totalAmount),
    },
    {
      key: 'status',
      header: 'Status',
      render: (order) => (
        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getOrderStatusColor(order.status)}`}>
          {order.status}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Date',
      render: (order) => new Date(order.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="mt-1 text-sm text-gray-500">Manage purchase orders and track deliveries.</p>
          </div>
          <Button>New Order</Button>
        </div>

        <div className="w-80">
          <Input
            placeholder="Search orders..."
            value={filters.search ?? ''}
            onChange={(e) => setFilters({ search: e.target.value, page: 1 })}
          />
        </div>

        <Table<Order>
          columns={columns}
          data={data?.data ?? []}
          keyExtractor={(o) => o.id}
          isLoading={isLoading}
          emptyMessage="No orders found."
        />
      </div>
    </ErrorBoundary>
  );
}
