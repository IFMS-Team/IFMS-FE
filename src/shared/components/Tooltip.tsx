import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  return (
    <div className="group relative">
      {children}
      <div className="pointer-events-none absolute right-0 bottom-full mb-2 w-52 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {content}
        <div className="absolute right-2 top-full border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}
