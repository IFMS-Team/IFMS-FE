'use client';

import { useEffect, useSyncExternalStore, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/configs';

const emptySubscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const hydrated = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated || !isAuthenticated) return null;

  return <>{children}</>;
}
