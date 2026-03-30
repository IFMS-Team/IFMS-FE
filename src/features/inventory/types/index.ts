export interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  quantity: number;
  location: string;
  reorderLevel: number;
  lastRestocked: string;
  updatedAt: string;
}

export interface InventoryAdjustment {
  id: string;
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
  createdAt: string;
}

export interface AdjustInventoryPayload {
  productId: string;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  reason: string;
}
