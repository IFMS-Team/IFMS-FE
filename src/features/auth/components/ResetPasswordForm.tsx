'use client';

import { useState, FormEvent } from 'react';
import { EyeIcon, EyeOffIcon, ImageButton } from '@/shared/components';
import { useResetPassword } from '../hooks';

const INPUT_BASE =
  'block w-full rounded-[6px] border bg-white py-2.5 pl-4 pr-11 text-sm text-gray-900 shadow-sm placeholder:text-gray-400 outline-none ring-2 transition-all';
const INPUT_NORMAL = `${INPUT_BASE} border-gray-300 ring-transparent focus:border-gray-900 focus:ring-gray-900/20`;
const INPUT_ERROR = `${INPUT_BASE} border-red-400 ring-red-500/20 focus:border-red-500 focus:ring-red-500/30`;

const PASSWORD_RULES = [
  { key: 'length', label: 'Ít nhất 8 ký tự', test: (v: string) => v.length >= 8 },
  { key: 'digit', label: '1 chữ số', test: (v: string) => /\d/.test(v) },
  { key: 'upper', label: '1 chữ hoa', test: (v: string) => /[A-Z]/.test(v) },
  { key: 'lower', label: '1 chữ thường', test: (v: string) => /[a-z]/.test(v) },
  { key: 'special', label: '1 trong những ký tự sau: @$!%*?&', test: (v: string) => /[@$!%*?&]/.test(v) },
] as const;

interface ResetPasswordFormProps {
  email: string;
  resetToken: string;
  onSuccess?: () => void;
}

export function ResetPasswordForm({ email, resetToken, onSuccess }: ResetPasswordFormProps) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({ new: false, confirm: false });
  const resetPassword = useResetPassword();

  const ruleResults = PASSWORD_RULES.map((r) => ({ ...r, pass: r.test(newPassword) }));
  const allRulesPass = ruleResults.every((r) => r.pass);
  const passwordsMatch = newPassword === confirmPassword;
  const isValid = allRulesPass && passwordsMatch && confirmPassword.length > 0;

  const confirmError =
    touched.confirm && confirmPassword.length > 0 && !passwordsMatch
      ? 'Mật khẩu xác nhận không khớp'
      : '';
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ new: true, confirm: true });
    if (!isValid) return;

    resetPassword.mutate(
      { reset_token: resetToken, new_password: newPassword, confirm_password: confirmPassword },
      { onSuccess: () => onSuccess?.() },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <p className="text-center text-sm text-[#717179]">
        Vui lòng nhập mã OTP được gửi đến <strong className="text-[#09090B]">{email}</strong>
      </p>
      {/* New password */}
      <div>
        <label htmlFor="new-password" className="mb-1.5 block text-sm font-medium text-gray-700">
          Mật khẩu mới <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="new-password"
            type={showNew ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, new: true }))}
            placeholder="Nhập mật khẩu mới"
            className={touched.new && !allRulesPass ? INPUT_ERROR : INPUT_NORMAL}
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
          >
            {showNew ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>
      {/* Confirm password */}
      <div>
        <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-gray-700">
          Xác nhận mật khẩu mới <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="confirm-password"
            type={showConfirm ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
            placeholder="Nhập lại mật khẩu mới để xác nhận"
            className={confirmError ? INPUT_ERROR : INPUT_NORMAL}
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
            >
            {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
        {confirmError && <p className="mt-1 text-sm text-red-500">{confirmError}</p>}
      </div>
      {/* Password rules checklist */}
      <div className="rounded-[6px] border border-gray-200 bg-white p-4">
        <p className="mb-2 text-sm font-medium text-gray-700">Mật khẩu phải bao gồm:</p>
        <ul className="space-y-1.5">
          {ruleResults.map((rule) => (
            <li key={rule.key} className="flex items-center gap-2 text-sm">
              {rule.pass ? (
                <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <circle cx="12" cy="12" r="9" />
                </svg>
              )}
              <span className={rule.pass ? 'text-green-600' : 'text-gray-500'}>{rule.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Submit */}
      <ImageButton type="submit" disabled={!isValid || resetPassword.isPending} loading={resetPassword.isPending}>
        Đặt lại mật khẩu
      </ImageButton>

      {resetPassword.isError && (
        <p className="text-center text-sm text-red-500">
          {(resetPassword.error as { message?: string })?.message ?? 'Đặt lại mật khẩu thất bại.'}
        </p>
      )}
    </form>
  );
}
