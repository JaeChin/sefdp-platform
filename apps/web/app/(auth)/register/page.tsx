'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, Check } from 'lucide-react';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
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

            <div className="my-6 border-b border-white/10" />

            {submitted ? (
              /* Success screen */
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00A86B]/20">
                  <Check className="h-6 w-6 text-[#00A86B]" />
                </div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Account request submitted
                </h2>
                <p className="text-sm text-slate-400">
                  You&apos;ll receive an email once your access is approved by the
                  programme administrator.
                </p>
                <Link
                  href="/login"
                  className="mt-4 inline-block text-sm hover:underline"
                  style={{ color: "#F5C200" }}
                >
                  &larr; Back to sign in
                </Link>
              </div>
            ) : (
              /* Registration form */
              <form onSubmit={handleSubmit}>
                {/* Group 1 — About You */}
                <div className="mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                    About You
                    <span className="flex-1 border-t border-white/10" />
                  </p>
                  {/* First Name + Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-1.5 block text-sm font-medium text-slate-300"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Jane"
                        autoComplete="given-name"
                        className="w-full rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-1.5 block text-sm font-medium text-slate-300"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Okafor"
                        autoComplete="family-name"
                        className="w-full rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>
                  {/* Email Address */}
                  <div className="mt-4">
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
                </div>

                {/* Group 2 — Your Organisation */}
                <div className="mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                    Your Organisation
                    <span className="flex-1 border-t border-white/10" />
                  </p>
                  {/* Organisation Name */}
                  <div>
                    <label
                      htmlFor="organisation"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Organisation Name
                    </label>
                    <input
                      id="organisation"
                      type="text"
                      placeholder="Acme Solar Ltd"
                      autoComplete="organization"
                      className="w-full rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                  {/* Organisation Type */}
                  <div className="mt-4">
                    <label
                      htmlFor="orgType"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Organisation Type
                    </label>
                    <select
                      id="orgType"
                      defaultValue=""
                      className="w-full appearance-none rounded-lg px-4 py-3 text-white focus:outline-none [&>option]:bg-[#0A2540] [&>option]:text-white"
                      style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <option value="" disabled className="text-slate-500">
                        Select organisation type
                      </option>
                      <option value="solar_developer">Solar Developer</option>
                      <option value="dfi">DFI / Development Finance</option>
                      <option value="commercial_bank">Commercial Bank</option>
                      <option value="impact_fund">Impact Fund</option>
                      <option value="private_equity">Private Equity</option>
                      <option value="institutional_investor">Institutional Investor</option>
                      <option value="consultant">Consultant / Advisory</option>
                      <option value="government">Government / Regulator</option>
                    </select>
                  </div>
                  {/* Role / Designation */}
                  <div className="mt-4">
                    <label
                      htmlFor="role"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Your Role / Designation
                    </label>
                    <select
                      id="role"
                      defaultValue=""
                      className="w-full appearance-none rounded-lg px-4 py-3 text-white focus:outline-none [&>option]:bg-[#0A2540] [&>option]:text-white [&>optgroup]:bg-[#0A2540] [&>optgroup]:text-slate-400"
                      style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                    >
                      <option value="" disabled className="text-slate-500">
                        Select your role
                      </option>
                      <optgroup label="Executive">
                        <option value="ceo">Chief Executive Officer</option>
                        <option value="cfo">Chief Financial Officer</option>
                        <option value="coo">Chief Operating Officer</option>
                        <option value="md">Managing Director</option>
                      </optgroup>
                      <optgroup label="Management">
                        <option value="director">Director</option>
                        <option value="gm">General Manager</option>
                        <option value="vp">Vice President</option>
                        <option value="hod">Head of Department</option>
                      </optgroup>
                      <optgroup label="Professional">
                        <option value="investment_analyst">Investment Analyst</option>
                        <option value="portfolio_manager">Portfolio Manager</option>
                        <option value="programme_officer">Programme Officer</option>
                        <option value="project_manager">Project Manager</option>
                        <option value="legal_counsel">Legal Counsel</option>
                        <option value="compliance_officer">Compliance Officer</option>
                        <option value="technical_advisor">Technical Advisor</option>
                        <option value="financial_analyst">Financial Analyst</option>
                        <option value="risk_analyst">Risk Analyst</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="other">Other</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Group 3 — Security */}
                <div className="mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                    Security
                    <span className="flex-1 border-t border-white/10" />
                  </p>
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
                      autoComplete="new-password"
                      className="w-full rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                  {/* Confirm Password */}
                  <div className="mt-4">
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className="w-full rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none"
                      style={{ background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" }}
                      onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)"; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                {/* Submit button */}
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
                      Submitting...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </button>
              </form>
            )}

            {/* Sign in link */}
            {!submitted && (
              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="hover:underline"
                  style={{ color: "#F5C200" }}
                >
                  Sign in &rarr;
                </Link>
              </p>
            )}

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
          <svg viewBox="0 0 280 160" className="w-full mt-8" style={{ opacity: 0.35 }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="16" stroke="#F5C200" strokeWidth="1.5" />
            <circle cx="40" cy="80" r="16" stroke="#F5C200" strokeWidth="1.5" />
            <circle cx="40" cy="120" r="16" stroke="#F5C200" strokeWidth="1.5" />
            <circle cx="240" cy="55" r="16" stroke="white" strokeWidth="1.5" />
            <circle cx="240" cy="105" r="16" stroke="white" strokeWidth="1.5" />
            <line x1="56" y1="40" x2="224" y2="55" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="56" y1="80" x2="224" y2="55" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="56" y1="80" x2="224" y2="105" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="56" y1="120" x2="224" y2="105" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
            <circle cx="140" cy="80" r="20" stroke="#F5C200" strokeWidth="1.5" fill="rgba(245,194,0,0.08)" />
            <text x="140" y="85" textAnchor="middle" fill="#F5C200" fontSize="8" fontFamily="IBM Plex Mono">SEF-DP</text>
          </svg>
          <p className="text-center text-xs text-white/25 mt-2 font-mono tracking-wide">Developer → Platform → Financier</p>
        </div>

      </div>
    </div>
  );
}
