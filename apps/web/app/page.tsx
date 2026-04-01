import Link from 'next/link';
import { ArrowRight, Zap, Store, Building2 } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A2540]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 pt-24 text-center">
        {/* Programme badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#00A86B]/40 bg-[#00A86B]/10 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00A86B]" aria-hidden="true" />
          <span className="text-sm font-medium text-[#00A86B]">
            Nigeria DARES Programme · World Bank · $750M
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Sustainable Energy Finance,{' '}
          <span className="text-[#00A86B]">Reimagined for Africa</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-slate-300">
          IFC-screened projects. World Bank-verified developers. One platform
          connecting capital to impact.
        </p>

        {/* Product Cards */}
        <div className="mt-14 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
          {/* DARES Card */}
          <Link
            href="/dashboard"
            className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 text-left backdrop-blur-sm transition-all hover:border-[#00A86B]/50 hover:bg-white/10"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00A86B]/30 bg-[#00A86B]/15">
              <Zap className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-xl font-bold text-white">DARES</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#00A86B]">
              Portfolio Management
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Manage project applications, milestone tracking, claims verification, and PAYGO
              disbursement calculations for the DARES programme.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A86B]">
              Open Dashboard
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>

          {/* Marketplace Card */}
          <Link
            href="/marketplace/overview"
            className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 text-left backdrop-blur-sm transition-all hover:border-[#00A86B]/50 hover:bg-white/10"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00A86B]/30 bg-[#00A86B]/15">
              <Store className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-xl font-bold text-white">Marketplace</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#00A86B]">
              Investor–Developer Platform
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Connect IFC-screened solar developers with DFIs, commercial banks, and impact investors
              through credit-scored project profiles.
            </p>
            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#00A86B]">
              Browse Marketplace
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>
          </Link>
        </div>

        {/* Credibility Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center divide-x divide-white/10">
          <div className="px-8 py-2 text-center">
            <p className="font-mono text-2xl font-bold text-white">$750M</p>
            <p className="mt-0.5 text-xs text-slate-400">DARES Programme</p>
          </div>
          <div className="px-8 py-2 text-center">
            <p className="font-mono text-2xl font-bold text-white">847</p>
            <p className="mt-0.5 text-xs text-slate-400">Active Projects</p>
          </div>
          <div className="px-8 py-2 text-center">
            <p className="font-mono text-2xl font-bold text-white">9</p>
            <p className="mt-0.5 text-xs text-slate-400">Institutional Financiers</p>
          </div>
        </div>
      </div>

      {/* ── Footer strip ─────────────────────────────────────────────── */}
      <div className="border-t border-white/10 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-slate-500" aria-hidden="true" />
            <span className="text-xs text-slate-500">
              Operated under World Bank DARES Programme · Nigerian NDPA Compliant
            </span>
          </div>
          <span className="font-mono text-xs text-slate-600">SEF-DP v2.0</span>
        </div>
      </div>
    </main>
  );
}
