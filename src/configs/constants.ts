export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

export const QUERY_STALE_TIME = 5 * 60 * 1000;
export const QUERY_CACHE_TIME = 10 * 60 * 1000;

export const DEFAULT_PAGE_SIZE = 10;

export const ROLES = {
  ADMIN: 'admin',
  STAFF: 'staff',
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PRODUCTS: '/dashboard/products',
  INVENTORY: '/dashboard/inventory',
  ORDERS: '/dashboard/orders',
} as const;
