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
                  className="mt-4 inline-block text-sm text-[#00A86B] hover:underline"
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
                        className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00A86B]/50 focus:outline-none"
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
                        className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00A86B]/50 focus:outline-none"
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
                      className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00A86B]/50 focus:outline-none"
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
                      className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00A86B]/50 focus:outline-none"
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
                      className="w-full appearance-none rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white focus:border-[#00A86B]/50 focus:outline-none [&>option]:bg-[#0A2540] [&>option]:text-white"
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
                      className="w-full appearance-none rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white focus:border-[#00A86B]/50 focus:outline-none [&>option]:bg-[#0A2540] [&>option]:text-white [&>optgroup]:bg-[#0A2540] [&>optgroup]:text-slate-400"
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
                      className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00A86B]/50 focus:outline-none"
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
                      className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#00A86B]/50 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
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
                  className="text-[#00A86B] hover:underline"
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
      <div className="hidden lg:flex lg:w-2/5 flex-col items-center justify-center p-12 border-l border-white/10 bg-white/[0.03]">
        {/* Quote + pills */}
        <div className="flex flex-1 flex-col justify-center">
          <p className="font-display text-2xl font-semibold italic leading-relaxed text-white">
            &ldquo;Digital infrastructure for Africa&apos;s energy transition.&rdquo;
          </p>

          <div className="mt-10 flex flex-col items-start gap-3 max-w-sm">
            {[
              { icon: ShieldCheck, label: 'Nigerian NDPA Compliant' },
              { icon: FileCheck, label: 'SEforALL Partner Platform' },
              { icon: Check, label: 'International Standards Aligned' },
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

      </div>
    </div>
  );
}
