'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { EyeIcon, EyeOffIcon } from '@/shared/components';
import { useLogin } from '../hooks';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ username: false, password: false });
  const login = useLogin();

  const errors = {
    username: touched.username && !username.trim() ? 'Username is required' : '',
    password: touched.password && !password.trim() ? 'Password is required' : '',
  };

  const hasApiError = login.isError;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (!username.trim() || !password.trim()) return;
    login.mutate({ email: username, password });
  };

  const inputBase = `block w-full rounded-xl border bg-white px-4 py-2.5 text-sm
    text-gray-900 shadow-sm placeholder:text-gray-400 outline-none ring-2 transition-all`;

  const inputNormal = `${inputBase} border-gray-300 ring-transparent
    focus:border-gray-900 focus:ring-gray-900/20`;

  const inputError = `${inputBase} border-red-400 ring-red-500/20
    focus:border-red-500 focus:ring-red-500/30`;

  const getInputClass = (field: 'username' | 'password') =>
    errors[field] || hasApiError ? inputError : inputNormal;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, username: true }))}
          placeholder="Enter your username"
          className={getInputClass('username')}
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-500">{errors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            placeholder="Enter your password"
            className={`${getInputClass('password')} pr-11`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded-[6px] border-gray-300 text-black accent-black focus:ring-black p-[3px]"
          />
          Remember me
        </label>
        <a href="#" className="text-sm font-medium text-black hover:text-gray-600 transition-colors">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        disabled={login.isPending}
        className="relative flex w-full items-center justify-center cursor-pointer
          disabled:cursor-not-allowed disabled:opacity-60 transition-opacity hover:opacity-90
          focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        <Image src="/images/auth/Button.png" alt="" width={400} height={48} className="w-full" draggable={false} priority />
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm font-semibold text-white">
          {login.isPending && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          Login
        </span>
      </button>

      {login.isError && (
        <p className="text-center text-sm text-red-500">
          {(login.error as { message?: string })?.message ?? 'Invalid credentials. Please try again.'}
        </p>
      )}
    </form>
  );
}

