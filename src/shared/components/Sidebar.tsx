'use client';

import { ComponentType } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore, useUIStore } from '@/store';
import { InventoryIcon, LogoutIcon, ReportIcon, SidebarToggleIcon } from './icons';
import { ROUTES } from '@/configs';

const MOCK_USER = {
  name: 'Quy Sư Minh',
  role: 'Kiểm kê viên',
  notifications: 2,
};

interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  badge?: boolean;
}

const navItems: NavItem[] = [
  { href: '/dashboard/inventory', label: 'Kiểm kê', icon: InventoryIcon, badge: true },
  { href: '/dashboard/reports', label: 'Báo cáo\nđã gửi', icon: ReportIcon, badge: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSidebarOpen, toggleSidebar } = useUIStore();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const initials = MOCK_USER.name.split(' ').map((w) => w[0]).join('').slice(0, 2);

  const navigate = (href: string) => {
    router.push(href);
  };

  const handleLogout = () => {
    clearAuth();
    router.push(ROUTES.LOGIN);
  };

  return (
    <aside
      className={`relative z-30 flex shrink-0 flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        isSidebarOpen ? 'w-40' : 'w-[72px]'
      }`}
    >
      {/* Logo + Toggle */}
      <div className="flex h-14 shrink-0 items-center justify-between px-3">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex cursor-pointer items-center gap-2 overflow-hidden"
        >
          <Image
            src="/images/logo_ifms.svg"
            alt="IFMS"
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-lg"
          />
        </button>
        <button
          onClick={toggleSidebar}
          className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-100"
        >
          <SidebarToggleIcon className="h-3.5 w-3.5 text-[#717179]" />
        </button>
      </div>

      {/* User profile */}
      <div className="flex flex-col items-center px-2 pt-6 pb-4">
        <div className="relative">
          <Image
            src="/images/user/avater_default.png"
            alt={MOCK_USER.name}
            width={80}
            height={80}
            className={`rounded-full border-2 border-gray-200 object-cover transition-all duration-300 ${
              isSidebarOpen ? 'h-20 w-20' : 'h-10 w-10'
            }`}
          />
          {MOCK_USER.notifications > 0 && (
            <span className={`absolute flex items-center justify-center rounded-full bg-red-500 font-bold text-white transition-all duration-300 ${
              isSidebarOpen ? '-top-0.5 -right-0.5 h-5 w-5 text-[10px]' : '-top-0.5 -right-1 h-4 w-4 text-[8px]'
            }`}>
              {MOCK_USER.notifications}
            </span>
          )}
        </div>
        {isSidebarOpen && (
          <div className="mt-3 text-center">
            <p className="text-sm font-semibold text-gray-900">{MOCK_USER.name}</p>
            <p className="text-xs text-gray-500">{MOCK_USER.role}</p>
          </div>
        )}
      </div>

      {/* Nav items */}
      <nav className={`flex-1 py-2 ${isSidebarOpen ? 'px-2' : 'px-2'} flex flex-col items-center`}>
        <div className="flex flex-col items-center gap-2 rounded-[16px] bg-[#F4F4F5] p-[8px]">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              title={isSidebarOpen ? undefined : item.label.replace('\n', ' ')}
              style={isActive ? {
                background: 'linear-gradient(180deg, #FFFFFF 0%, #EDF8F1 100%) padding-box, linear-gradient(180deg, #EDF8F1 0%, #FFFFFF 100%) border-box',
                border: '1px solid transparent',
              } : undefined}
              className={`relative flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl text-center transition-colors ${
                isActive
                  ? 'text-emerald-700 shadow-md'
                  : 'bg-[#FAFAFA] text-gray-500'
              } ${isSidebarOpen ? 'h-[114px] w-[114px]' : 'h-12 w-12'}`}
            >
              {item.badge && (
                <span className={`absolute h-2 w-2 rounded-full bg-emerald-500 ${isSidebarOpen ? 'top-3 right-3' : 'top-2 right-2'}`} />
              )}
              <item.icon className="h-6 w-6 shrink-0" />
              {isSidebarOpen && (
                <span className="text-xs font-medium leading-tight whitespace-pre-line">{item.label}</span>
              )}
            </button>
          );
        })}
        </div>
      </nav>

      {/* Logout */}
      <div className={`border-t border-gray-200 py-4 ${isSidebarOpen ? 'px-4' : 'px-2'}`}>
        <button
          onClick={handleLogout}
          title={isSidebarOpen ? undefined : 'Đăng xuất'}
          className={`flex w-full cursor-pointer items-center rounded-lg py-2 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 ${
            isSidebarOpen ? 'justify-center gap-2 px-3' : 'justify-center px-2'
          }`}
        >
          <LogoutIcon className="h-5 w-5 shrink-0" />
          {isSidebarOpen && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
