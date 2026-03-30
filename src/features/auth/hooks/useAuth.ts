'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { ROUTES } from '@/configs';
import { authApi } from '../api';
import type { LoginPayload, RegisterPayload } from '../types';

export function useLogin() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      setAuth(
        { ...data.user, avatar: undefined, createdAt: '', updatedAt: '' },
        data.tokens,
      );
      router.push(ROUTES.DASHBOARD);
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      setAuth(
        { ...data.user, avatar: undefined, createdAt: '', updatedAt: '' },
        data.tokens,
      );
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
