import { ButtonHTMLAttributes, ReactNode } from 'react';
import Image from 'next/image';
import { SpinnerIcon } from './icons';

const VARIANTS = {
  long: {
    src: '/images/auth/Button.png',
    width: 400,
    imgClass: 'w-full',
    btnClass: 'relative flex w-full cursor-pointer items-center justify-center transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
  },
  mini: {
    src: '/images/auth/Button_mini.png',
    width: 200,
    imgClass: 'h-10 w-auto',
    btnClass: 'relative flex cursor-pointer items-center justify-center transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
  },
} as const;

interface ImageButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: keyof typeof VARIANTS;
  loading?: boolean;
  children: ReactNode;
}

export function ImageButton({ variant = 'long', loading, children, ...rest }: ImageButtonProps) {
  const v = VARIANTS[variant];

  return (
    <button {...rest} className={`${v.btnClass} ${rest.className ?? ''}`}>
      <Image
        src={v.src}
        alt=""
        width={v.width}
        height={48}
        className={v.imgClass}
        draggable={false}
        priority={variant === 'long'}
      />
      <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm font-semibold text-white">
        {loading && <SpinnerIcon />}
        {children}
      </span>
    </button>
  );
}
