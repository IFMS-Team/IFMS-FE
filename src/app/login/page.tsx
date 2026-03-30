import { LoginForm } from '@/features/auth';

export default function LoginPage() {
  return (
    <div className="isometric-bg flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">IFMS</h1>
          <p className="mt-2 text-sm font-medium text-gray-500">
            Inventory &amp; Fulfillment Management
          </p>
        </div>

        <div className="glow-border rounded-2xl">
          <div className="rounded-2xl border border-white/60 bg-white/50 p-8 shadow-xl shadow-purple-200/20">
            <h2 className="mb-1 text-center text-[44px] font-bold uppercase text-[#09090B]">Welcome</h2>
            <p className="mb-6 text-center text-sm text-[#717179]">Smart campus asset management starts here.</p>
            <LoginForm />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} IFMS. All rights reserved.
        </p>
      </div>
    </div>
  );
}
