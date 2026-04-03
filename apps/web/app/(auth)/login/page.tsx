'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, FileCheck, Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<'credentials' | '2fa'>('credentials');
  const [twoFaCode, setTwoFaCode] = useState('');
  const [twoFaError, setTwoFaError] = useState(false);
  const [twoFaLoading, setTwoFaLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState<'/marketplace/overview' | '/dashboard' | '/marketplace/regulator'>('/marketplace/overview');
  const DEMO_CODE = '123456';

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStage('2fa');
    }, 1500);
  }

  async function handleTwoFaSubmit() {
    setTwoFaLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    if (twoFaCode === DEMO_CODE) {
      router.push(redirectTo);
    } else {
      setTwoFaError(true);
      setTwoFaLoading(false);
      setTwoFaCode('');
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-[#0A2540]">

      {/* ── Left panel ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:w-3/5">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-10">

            {/* Wordmark */}
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-white">SEF-DP</span>
              <span className="h-2 w-2 rounded-full bg-[#00A86B]" aria-hidden="true" />
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Sustainable Energy Finance Developer Platform
            </p>
            {stage === '2fa' && (
              <p className="mt-2 text-sm font-semibold text-[#00A86B]">
                Two-Factor Authentication
              </p>
            )}

            <div className="my-6 border-b border-white/10" />

            {stage === 'credentials' ? (
            /* Form */
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
                  placeholder="your@organisation.ng"
                  autoComplete="email"
                  className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00A86B]/50 focus:outline-none"
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
                  className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00A86B]/50 focus:outline-none"
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
            ) : (
            /* 2FA code entry */
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-300 mb-1">Verification Code</p>
                <p className="text-xs text-slate-500 mb-4">
                  A 6-digit code has been sent to j***@***.com via SMS.
                </p>
                {/* 6 individual digit boxes side by side */}
                <div className="flex gap-2 justify-center mb-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <input
                      key={i}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={twoFaCode[i] || ''}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const next = twoFaCode.split('');
                        next[i] = val;
                        setTwoFaCode(next.join(''));
                        setTwoFaError(false);
                        // auto-advance focus to next input
                        if (val && i < 5) {
                          const inputs = document.querySelectorAll<HTMLInputElement>('.otp-input');
                          inputs[i + 1]?.focus();
                        }
                      }}
                      className={`otp-input w-10 h-12 text-center text-lg font-mono rounded-lg border bg-white/8 text-white focus:outline-none focus:ring-2 focus:ring-[#00A86B] ${
                        twoFaError ? 'border-red-500' : 'border-slate-600'
                      }`}
                    />
                  ))}
                </div>
                {twoFaError && (
                  <p className="text-xs text-red-400 text-center">Incorrect code. Try 123456 for demo.</p>
                )}
                <p className="text-xs text-slate-500 text-center mt-2">
                  Demo code: <span className="font-mono text-[#00A86B]">123456</span>
                </p>
              </div>

              <button
                onClick={handleTwoFaSubmit}
                disabled={twoFaCode.length < 6 || twoFaLoading}
                className="w-full py-2.5 rounded-lg bg-[#00A86B] text-white text-sm font-semibold disabled:opacity-50 transition-opacity"
              >
                {twoFaLoading ? 'Verifying...' : 'Verify & Sign In'}
              </button>

              <button
                onClick={() => { setStage('credentials'); setTwoFaCode(''); setTwoFaError(false); }}
                className="w-full text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                ← Back
              </button>
            </div>
            )}

            <p className="mt-4 text-center text-xs text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-[#00A86B] hover:underline">
                Request access &rarr;
              </Link>
            </p>

            {/* Demo shortcuts */}
            <div className="mt-4 border border-dashed border-white/15 rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Demo Access</span>
                <div className="flex-1 border-t border-white/10" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/dashboard"
                  onClick={() => setRedirectTo('/dashboard')}
                  className="text-xs text-slate-400 transition-colors hover:text-[#00A86B]"
                >
                  → Open as PMU Administrator
                </Link>
                <Link
                  href="/marketplace/overview"
                  onClick={() => setRedirectTo('/marketplace/overview')}
                  className="text-xs text-slate-400 transition-colors hover:text-[#00A86B]"
                >
                  → Open as Marketplace User
                </Link>
                <Link
                  href="/marketplace/regulator"
                  onClick={() => setRedirectTo('/marketplace/overview')}
                  className="text-xs text-slate-400 transition-colors hover:text-[#00A86B]"
                >
                  → Open as CBN Regulator
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
          <p className="font-display text-2xl font-semibold italic leading-relaxed text-white/80">
            &ldquo;Digital infrastructure for Africa&apos;s energy transition.&rdquo;
          </p>

          <div className="mt-10 flex flex-col items-start gap-3 max-w-sm">
            {[
              { icon: ShieldCheck, label: 'Nigerian NDPA Compliant' },
              { icon: FileCheck, label: 'SEforALL Partner Platform' },
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

          {/* Abstract connection diagram */}
          <div className="mt-10 w-full max-w-xs mx-auto">
            <svg viewBox="0 0 280 160" className="w-full opacity-20" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Developer nodes */}
              <circle cx="40" cy="40" r="16" stroke="#00A86B" strokeWidth="1.5" />
              <circle cx="40" cy="80" r="16" stroke="#00A86B" strokeWidth="1.5" />
              <circle cx="40" cy="120" r="16" stroke="#00A86B" strokeWidth="1.5" />
              {/* Financier nodes */}
              <circle cx="240" cy="55" r="16" stroke="white" strokeWidth="1.5" />
              <circle cx="240" cy="105" r="16" stroke="white" strokeWidth="1.5" />
              {/* Connection lines */}
              <line x1="56" y1="40" x2="224" y2="55" stroke="#00A86B" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="56" y1="80" x2="224" y2="55" stroke="#00A86B" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="56" y1="80" x2="224" y2="105" stroke="#00A86B" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="56" y1="120" x2="224" y2="105" stroke="#00A86B" strokeWidth="1" strokeDasharray="4 3" />
              {/* Centre match node */}
              <circle cx="140" cy="80" r="20" stroke="#00A86B" strokeWidth="1.5" fill="rgba(0,168,107,0.08)" />
              <text x="140" y="85" textAnchor="middle" fill="#00A86B" fontSize="8" fontFamily="IBM Plex Mono">SEF-DP</text>
            </svg>
            <p className="text-center text-xs text-white/25 mt-2 font-mono tracking-wide">Developer → Platform → Financier</p>
          </div>
        </div>

      </div>
    </div>
  );
}
