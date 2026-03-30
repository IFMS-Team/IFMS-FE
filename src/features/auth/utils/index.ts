import type { Role } from '@/types';

export function hasPermission(userRole: Role, requiredRoles: Role[]): boolean {
  return requiredRoles.includes(userRole);
}

export function isAdmin(role: Role): boolean {
  return role === 'admin';
}
