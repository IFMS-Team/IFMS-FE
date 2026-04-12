'use client';

import { ErrorBoundary, ProtectedRoute, Sidebar } from '@/shared/components';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 items-center border-b border-gray-200 bg-white px-6 shadow-md">
          <div />
        </header>

        <main className="isometric-bg-bw flex-1 overflow-y-auto p-6">
          <ProtectedRoute>
            <ErrorBoundary>{children}</ErrorBoundary>
          </ProtectedRoute>
        </main>
      </div>
    </div>
  );
}
