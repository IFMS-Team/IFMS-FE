'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Squircle } from 'corner-smoothing';
import { LoginForm, ForgotPasswordForm, OtpForm, ResetPasswordForm } from '@/features/auth';
import type { ForgotPasswordPayload } from '@/features/auth/types';

type View = 'login' | 'forgot' | 'otp' | 'reset';

const HEADINGS: Record<View, { title: string; subtitle?: string }> = {
  login: { title: 'Chào mừng', subtitle: 'Nền tảng thông minh cho quản lý tài sản.' },
  forgot: { title: 'Quên mật khẩu', subtitle: 'Vui lòng nhập tất cả thông tin bên dưới' },
  otp: { title: 'Xác nhận OTP' },
  reset: { title: 'Đặt lại mật khẩu' },
};

export default function LoginPage() {
  const [view, setView] = useState<View>('login');
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotData, setForgotData] = useState<ForgotPasswordPayload | null>(null);
  const [resetToken, setResetToken] = useState('');
  const heading = HEADINGS[view];

  const handleForgotSuccess = (email: string, data: ForgotPasswordPayload) => {
    setForgotEmail(email);
    setForgotData(data);
    setView('otp');
  };

  const handleOtpVerified = (token: string) => {
    setResetToken(token);
    setView('reset');
  };

  const handleResetSuccess = () => {
    setView('login');
  };

  return (
    <div className="isometric-bg relative flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glow-border">
          <Squircle
            cornerRadius={32}
            cornerSmoothing={1}
            className="relative z-1 border border-white/60 bg-white/50 p-8 shadow-md"
          >
            <h2 className={`mb-1 text-center font-bold text-[#09090B] ${view === 'login' ? 'text-[44px]' : 'text-[24px]'}`}>
              {heading.title}
            </h2>
            {heading.subtitle && (
              <p className="mb-6 text-center text-sm text-[#717179]">{heading.subtitle}</p>
            )}

            {view === 'login' && (
              <LoginForm onForgotPassword={() => setView('forgot')} />
            )}
            {view === 'forgot' && (
              <ForgotPasswordForm onBack={() => setView('login')} onSuccess={handleForgotSuccess} />
            )}
            {view === 'otp' && forgotData && (
              <OtpForm email={forgotEmail} forgotData={forgotData} onBack={() => setView('forgot')} onVerified={handleOtpVerified} />
            )}
            {view === 'reset' && (
              <ResetPasswordForm email={forgotEmail} resetToken={resetToken} onSuccess={handleResetSuccess} />
            )}
          </Squircle>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} IFMS. All rights reserved.
        </p>
      </div>

      {/* Contact buttons - bottom right */}
      <div className="fixed right-6 bottom-6 z-50 flex flex-col gap-3">
        <a href="tel:09111111123" className="relative block h-[60px] w-[200px] overflow-hidden rounded-xl transition-transform hover:scale-105">
          <Image
            src="/assets/button/sp_btn_phone.png"
            alt="Hotline"
            fill
            sizes="200px"
            className="object-contain drop-shadow-lg"
          />
          <div className="absolute inset-0 flex items-center pl-14">
            <div>
              <p className="text-[10px] font-extrabold tracking-wider text-gray-500">HOTLINE</p>
              <p className="text-sm font-bold text-[#35746E]">09111111123</p>
            </div>
          </div>
        </a>
        <a href="mailto:hotro@ifms.com" className="relative block h-[60px] w-[200px] overflow-hidden rounded-xl transition-transform hover:scale-105">
          <Image
            src="/assets/button/sp_btn_mail.png"
            alt="Email"
            fill
            sizes="200px"
            className="object-contain drop-shadow-lg"
          />
          <div className="absolute inset-0 flex items-center pl-14">
            <div>
              <p className="text-[10px] font-extrabold tracking-wider text-gray-500">EMAIL</p>
              <p className="text-sm font-bold text-[#D9622B]">hotro@ifms.com</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
