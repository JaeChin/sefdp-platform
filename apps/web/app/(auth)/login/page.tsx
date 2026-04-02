'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, FileCheck, Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  }

  return (
    <div className="flex min-h-screen w-full bg-[#0A2540]">

      {/* ── Left panel ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:w-3/5">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-10">

            {/* Wordmark */}
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-white">SEF-DP</span>
              <span className="h-2 w-2 rounded-full bg-[#00A86B]" aria-hidden="true" />
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Sustainable Energy Finance Developer Platform
            </p>

            <div className="my-6 border-b border-white/10" />

            {/* Form */}
            <form onSubmit={handleSignIn} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@organisation.org"
                  autoComplete="email"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#00A86B]/50 focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:border-[#00A86B]/50 focus:outline-none"
                />
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm text-[#00A86B] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#00A86B] py-3 font-semibold text-white transition-all duration-200 hover:bg-[#00A86B]/90 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo shortcuts */}
            <div className="mt-8">
              <p className="mb-2 text-xs uppercase tracking-widest text-slate-500">
                Quick access (demo only)
              </p>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/dashboard"
                  className="text-xs text-slate-400 transition-colors hover:text-[#00A86B]"
                >
                  → Open as PMU Administrator
                </Link>
                <Link
                  href="/marketplace/overview"
                  className="text-xs text-slate-400 transition-colors hover:text-[#00A86B]"
                >
                  → Open as Marketplace User
                </Link>
              </div>
            </div>

            {/* Footer notice */}
            <p className="mt-8 text-center text-xs text-slate-500">
              Access restricted to authorised programme participants. For access
              requests contact your programme administrator.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel (desktop only) ───────────────────────────────── */}
      <div className="hidden lg:flex lg:w-2/5 flex-col items-center justify-center p-12 border-l border-white/10 bg-white/[0.03]">
        {/* Quote + pills */}
        <div className="flex flex-1 flex-col justify-center">
          <p className="font-display text-2xl font-semibold italic leading-relaxed text-white">
            &ldquo;Digital infrastructure for Africa&apos;s energy transition.&rdquo;
          </p>

          <div className="mt-10 flex flex-col items-start gap-3 max-w-sm">
            {[
              { icon: ShieldCheck, label: 'Nigerian NDPA Compliant' },
              { icon: FileCheck, label: 'World Bank DARES Programme' },
              { icon: Check, label: 'IFC Standards Aligned' },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex w-fit items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3"
              >
                <Icon className="h-4 w-4 shrink-0 text-[#00A86B]" aria-hidden="true" />
                <span className="text-sm text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reference number */}
        <p className="font-mono text-xs text-[#00A86B]/60">
          DARES RFQ/2026/61763
        </p>
      </div>
    </div>
  );
}
