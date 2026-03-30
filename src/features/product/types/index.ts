export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  status: ProductStatus;
  imageUrl?: string;
  supplierId?: string;
  createdAt: string;
  updatedAt: string;
}

export type ProductStatus = 'active' | 'inactive' | 'discontinued';

export interface CreateProductPayload {
  name: string;
  sku: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  supplierId?: string;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  status?: ProductStatus;
}

export interface ProductFilters {
  category?: string;
  status?: ProductStatus;
  search?: string;
  page?: number;
  limit?: number;
}
