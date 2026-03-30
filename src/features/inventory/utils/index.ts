export function getStockStatus(quantity: number, reorderLevel: number): 'in-stock' | 'low' | 'out' {
  if (quantity === 0) return 'out';
  if (quantity <= reorderLevel) return 'low';
  return 'in-stock';
}

export function getStockStatusColor(status: 'in-stock' | 'low' | 'out'): string {
  const colors = {
    'in-stock': 'bg-green-100 text-green-800',
    low: 'bg-yellow-100 text-yellow-800',
    out: 'bg-red-100 text-red-800',
  };
  return colors[status];
}
