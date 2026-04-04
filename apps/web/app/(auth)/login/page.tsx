'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShieldCheck, FileCheck, Check } from 'lucide-react';
import { setDemoRole } from '@/lib/demo-role';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<'credentials' | '2fa'>('credentials');
  const [twoFaCode, setTwoFaCode] = useState('');
  const [twoFaError, setTwoFaError] = useState(false);
  const [twoFaLoading, setTwoFaLoading] = useState(false);
  const [redirectTo, setRedirectTo] = useState<'/marketplace/overview' | '/marketplace/regulator'>('/marketplace/overview');
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
    <div className="flex min-h-screen w-full relative" style={{ background: "#0A2540" }}>

      {/* Amber radial glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse 80% 60% at 15% 20%, rgba(245,194,0,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(13,51,73,0.4) 0%, transparent 60%)`,
      }} />

      {/* Fine grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      {/* Noise texture */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "128px 128px",
      }} />

      {/* 2px amber top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 50,
        background: "linear-gradient(90deg, transparent 0%, #F5C200 30%, #F5C200 70%, transparent 100%)",
      }} />

      {/* ── Left panel ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:w-3/5" style={{ position: "relative", zIndex: 1 }}>
        <div className="w-full max-w-md">
          <div className="rounded-2xl p-10 relative" style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 0 0 1px rgba(245,194,0,0.06), 0 24px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}>

            {/* Wordmark */}
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-white">SEF-DP</span>
              <span className="h-2 w-2 rounded-full" style={{ background: "#F5C200" }} aria-hidden="true" />
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
                  className="w-full rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
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
                  className="w-full rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>

              {/* Forgot password */}
              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm hover:underline" style={{ color: "#F5C200" }}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In button */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-80"
                style={{ background: "linear-gradient(135deg, #F5C200 0%, #E6A800 100%)", color: "#0D1E2E", fontWeight: 600 }}
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
                      className={`otp-input w-10 h-12 text-center text-lg font-mono rounded-lg border text-white focus:outline-none focus:ring-2 focus:ring-[#F5C200] ${
                        twoFaError ? 'border-red-500' : ''
                      }`}
                      style={{ background: "rgba(255,255,255,0.055)", border: twoFaError ? undefined : "1px solid rgba(255,255,255,0.12)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  ))}
                </div>
                {twoFaError && (
                  <p className="text-xs text-red-400 text-center">Incorrect code. Try 123456 for demo.</p>
                )}
                <p className="text-xs text-slate-500 text-center mt-2">
                  Demo code: <span className="font-mono" style={{ color: "#F5C200" }}>123456</span>
                </p>
              </div>

              <button
                onClick={handleTwoFaSubmit}
                disabled={twoFaCode.length < 6 || twoFaLoading}
                className="w-full py-2.5 rounded-lg text-white text-sm font-semibold disabled:opacity-50 transition-opacity"
                style={{ background: "linear-gradient(135deg, #F5C200 0%, #E6A800 100%)", color: "#0D1E2E" }}
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
              <Link href="/register" className="hover:underline" style={{ color: "#F5C200" }}>
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
                <button
                  onClick={() => { setDemoRole('marketplace'); router.push('/marketplace/overview'); }}
                  className="text-xs text-slate-400 transition-colors hover:text-[#F5C200] text-left"
                >
                  → Open as Marketplace User
                </button>
                <button
                  onClick={() => { setDemoRole('cbn'); router.push('/marketplace/regulator'); }}
                  className="text-xs text-slate-400 transition-colors hover:text-[#F5C200] text-left"
                >
                  → Open as CBN Regulator
                </button>
                <button
                  onClick={() => { setDemoRole('developer'); router.push('/marketplace/overview'); }}
                  className="text-xs text-slate-400 transition-colors hover:text-[#F5C200] text-left"
                >
                  → Open as Developer
                </button>
                <button
                  onClick={() => { setDemoRole('financier'); router.push('/marketplace/overview'); }}
                  className="text-xs text-slate-400 transition-colors hover:text-[#F5C200] text-left"
                >
                  → Open as Financier
                </button>
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
      <div className="hidden lg:flex lg:w-2/5 flex-col items-center justify-center p-12" style={{ position: "relative", zIndex: 1, borderLeft: "1px solid rgba(255,255,255,0.07)", background: "rgba(245,194,0,0.02)" }}>
        {/* Quote + pills */}
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-3xl font-semibold leading-relaxed text-white/90" style={{ fontFamily: "'Sora', sans-serif" }}>
            &ldquo;Digital infrastructure for{" "}
            <span style={{ color: "#F5C200" }}>Africa&apos;s energy transition</span>.&rdquo;
          </p>

          <div className="mt-10 flex flex-col gap-5 max-w-xs">
            {[
              { Icon: ShieldCheck, label: "Nigerian NDPA Compliant", sub: "Data privacy regulated" },
              { Icon: FileCheck, label: "SEforALL Partner Platform", sub: "UN sustainable energy initiative" },
              { Icon: Check, label: "International Standards Aligned", sub: "World Bank verified framework" },
            ].map(({ Icon, label, sub }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style={{
                  background: "rgba(245,194,0,0.12)",
                  border: "1px solid rgba(245,194,0,0.25)",
                }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: "#F5C200" }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/85">{label}</p>
                  <p className="text-xs text-white/40">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.1em', marginBottom: 8 }}>SUPPORTED BY</p>
            <img src="/logos/seforall-logo.png" alt="SEforALL" style={{ height: 28, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.7 }} />
          </div>

          {/* Abstract connection diagram */}
          <div className="mt-10 w-full max-w-xs mx-auto">
            <svg viewBox="0 0 280 160" className="w-full" style={{ opacity: 0.45 }} fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Developer nodes */}
              <circle cx="40" cy="40" r="16" stroke="#F5C200" strokeWidth="1.5" />
              <circle cx="40" cy="80" r="16" stroke="#F5C200" strokeWidth="1.5" />
              <circle cx="40" cy="120" r="16" stroke="#F5C200" strokeWidth="1.5" />
              {/* Financier nodes */}
              <circle cx="240" cy="55" r="16" stroke="white" strokeWidth="1.5" />
              <circle cx="240" cy="105" r="16" stroke="white" strokeWidth="1.5" />
              {/* Connection lines */}
              <line x1="56" y1="40" x2="224" y2="55" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="56" y1="80" x2="224" y2="55" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="56" y1="80" x2="224" y2="105" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="56" y1="120" x2="224" y2="105" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
              {/* Centre match node */}
              <circle cx="140" cy="80" r="20" stroke="#F5C200" strokeWidth="1.5" fill="rgba(245,194,0,0.1)" />
              <text x="140" y="85" textAnchor="middle" fill="#F5C200" fontSize="8" fontFamily="IBM Plex Mono">SEF-DP</text>
            </svg>
            <p className="text-center text-xs text-white/25 mt-2 font-mono tracking-wide">Developer → Platform → Financier</p>
          </div>
        </div>

      </div>
    </div>
  );
}
