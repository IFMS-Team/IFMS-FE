import type { Role } from '@/types';

export function getRoleBadgeColor(role: Role): string {
  const colors: Record<Role, string> = {
    admin: 'bg-purple-100 text-purple-800',
    staff: 'bg-blue-100 text-blue-800',
  };
  return colors[role];
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
