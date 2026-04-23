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

export type InventoryStatus = 'active' | 'in-use' | 'damaged' | 'lost' | 'maintenance' | 'inactive';

export type InventoryTab = 'list' | 'table' | 'card';

export type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc';

export interface TagItem {
  icon: 'clipboard' | 'document' | 'barcode';
  label: string;
}

export interface InventoryItemData {
  id: string;
  numericId: string;
  image: string;
  categoryPath: string;
  title: string;
  status: InventoryStatus;
  tags: TagItem[];
  createdBy: string;
  createdAt: string;
  enabled: boolean;
}
