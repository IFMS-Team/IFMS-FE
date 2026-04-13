'use client';

import { ComponentType } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useUIStore } from '@/store';
import { useMe } from '@/features/user/hooks';
import { InventoryIcon, ReportIcon, SidebarToggleIcon } from './icons';

const ROLE_DISPLAY: Record<string, string> = {
  admin: 'Quản trị viên',
  staff: 'Kiểm kê viên',
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
  const { isSidebarOpen, toggleSidebar, setSidebarOpen } = useUIStore();
  const { data: me } = useMe();

  const userName = me?.fullName ?? '...';
  const userRole = me?.roleId ? (ROLE_DISPLAY[me.roleId] ?? me.roleId) : '...';
  const userAvatar = me?.avatar || '/images/user/avater_default.png';

  const navigate = (href: string) => {
    router.push(href);
    setSidebarOpen(false);
  };

  const desktopWidth = isSidebarOpen ? 'md:w-40' : 'md:w-[72px]';

  return (
    <>
      {/* Mobile backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-40 shrink-0 flex-col border-r border-gray-200 bg-[#FAFAFA] transition-all duration-300 md:relative md:z-30 ${desktopWidth} ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Logo + Toggle (desktop only) */}
        <div className="flex h-14 shrink-0 items-center justify-between px-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex cursor-pointer items-center gap-2 overflow-hidden"
          >
            <Image
              src="/assets/logo/logo_ifms.svg"
              alt="IFMS"
              width={32}
              height={32}
              className="h-8 w-8 shrink-0 rounded-lg"
            />
          </button>
          <button
            onClick={toggleSidebar}
            className="hidden h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors hover:bg-gray-100 md:flex"
          >
            <SidebarToggleIcon className="h-3.5 w-3.5 text-[#717179]" />
          </button>
        </div>

        {/* User profile */}
        <div className="flex flex-col items-center px-2 pt-6 pb-4">
          <div className={`relative select-none overflow-hidden rounded-full cursor-pointer border-2 border-gray-200 transition-all duration-300 ${
            isSidebarOpen ? 'h-20 w-20' : 'h-10 w-10 md:h-10 md:w-10'
          }`}>
            <Image
              src={userAvatar}
              alt={userName}
              loading="eager"
              fill
              sizes="80px"
              className="object-cover"
            />
          </div>
          {isSidebarOpen && (
            <div className="mt-3 text-center">
              <p className="text-sm font-semibold text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{userRole}</p>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-2 px-2 flex flex-col items-center">
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
                  <span className={`absolute h-2 w-2 rounded-full bg-[#CA3A31] ${isSidebarOpen ? 'top-3 right-3' : 'top-2 right-2'}`} />
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
      </aside>
    </>
  );
}
