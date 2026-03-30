export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateSupplierPayload {
  name: string;
  email: string;
  phone: string;
  address: string;
  contactPerson: string;
}

export type UpdateSupplierPayload = Partial<CreateSupplierPayload> & {
  status?: 'active' | 'inactive';
};
