'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import { EyeIcon, EyeOffIcon, HelpCircleIcon, SpinnerIcon, Tooltip } from '@/shared/components';
import { useLogin } from '../hooks';

const INPUT_BASE =
  'block w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 outline-none ring-2 transition-all';

const INPUT_NORMAL = `${INPUT_BASE} border-gray-300 ring-transparent focus:border-gray-900 focus:ring-gray-900/20`;

const INPUT_ERROR = `${INPUT_BASE} border-red-400 ring-red-500/20 focus:border-red-500 focus:ring-red-500/30`;

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

  const getInputClass = (field: 'username' | 'password') =>
    errors[field] || hasApiError ? INPUT_ERROR : INPUT_NORMAL;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ username: true, password: true });
    if (!username.trim() || !password.trim()) return;
    login.mutate({ email: username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Username */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">
            Username
          </label>
          <Tooltip content="This is the account that your admin will provide to you.">
            <HelpCircleIcon className="h-4 w-4 cursor-help text-gray-400" />
          </Tooltip>
        </div>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, username: true }))}
          placeholder="Enter your username"
          className={getInputClass('username')}
        />
        {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username}</p>}
      </div>

      {/* Password */}
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
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>

      {/* Options */}
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded-[6px] border-gray-300 p-[3px] text-black accent-black focus:ring-black"
          />
          Remember me
        </label>
        <a href="#" className="text-sm font-medium text-black transition-colors hover:text-gray-600">
          Forgot password?
        </a>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={login.isPending}
        className="relative flex w-full cursor-pointer items-center justify-center transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Image src="/images/auth/Button.png" alt="" width={400} height={48} className="w-full" draggable={false} priority />
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm font-semibold text-white">
          {login.isPending && <SpinnerIcon />}
          Login
        </span>
      </button>

      {/* API error */}
      {login.isError && (
        <p className="text-center text-sm text-red-500">
          {(login.error as { message?: string })?.message ?? 'Invalid credentials. Please try again.'}
        </p>
      )}
    </form>
  );
}
