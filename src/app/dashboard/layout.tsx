'use client';

import { useState, useRef, useEffect } from 'react';
import { ErrorBoundary, ProtectedRoute, Sidebar } from '@/shared/components';
import { useUIStore } from '@/store';
import { useLogout } from '@/features/auth/hooks/useAuth';
import { BellIcon, LogoutIcon, MenuIcon, SidebarToggleIcon } from '@/shared/components/icons';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const logout = useLogout();
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    logout.mutate();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-md md:justify-end md:px-6">
          {/* Mobile sidebar toggle - left side */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 md:hidden"
          >
            <SidebarToggleIcon className="h-5 w-5" />
          </button>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <button
              className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <BellIcon className="h-6 w-6" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
            </button>

            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 ${
                  menuOpen ? 'bg-gray-100 text-gray-700' : ''
                }`}
              >
                <MenuIcon className="h-6 w-6" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
                  >
                    <LogoutIcon className="h-4 w-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="isometric-bg-bw flex-1 overflow-y-auto p-2 md:p-6">
          <ProtectedRoute>
            <ErrorBoundary>{children}</ErrorBoundary>
          </ProtectedRoute>
        </main>
      </div>
    </div>
  );
}
