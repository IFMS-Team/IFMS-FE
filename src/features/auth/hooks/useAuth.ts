'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/configs';
import { authApi } from '../api';
import type { LoginPayload } from '../types';

export function useLogin() {
  const router = useRouter();
  const setToken = useAuthStore((s) => s.setToken);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (token) => {
      setToken(token);
      router.push(ROUTES.DASHBOARD);
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      clearAuth();
      router.push(ROUTES.LOGIN);
    },
  });
}
