export function InactiveIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 12.25A5.25 5.25 0 1 0 7 1.75a5.25 5.25 0 0 0 0 10.5Z" />
      <path d="m9.625 4.375-5.25 5.25" />
    </svg>
  );
}
