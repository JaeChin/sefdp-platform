import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, ShieldCheck, FileCheck, Lock } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A2540]">

      {/* ── Section 1: Navigation ─────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0A2540]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-white">SEF-DP</span>
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00A86B]" aria-hidden="true" />
          </div>

          {/* Center nav links */}
          <div className="hidden items-center gap-8 md:flex">
            <a
              href="#platform"
              className="text-sm tracking-wide text-slate-300 transition-colors hover:text-white"
            >
              Platform
            </a>
            <a
              href="#about"
              className="text-sm tracking-wide text-slate-300 transition-colors hover:text-white"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-sm tracking-wide text-slate-300 transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-white/10"
            >
              Request Access
            </a>
            <Link
              href="/dashboard"
              className="rounded-lg bg-[#00A86B] px-4 py-2 text-sm text-white transition-all duration-200 hover:bg-[#00A86B]/90"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Section 2: Hero ──────────────────────────────────────────── */}
      <section className="flex flex-col items-center px-6 pb-16 pt-24 text-center">
        {/* Programme label */}
        <p className="mb-8 text-xs uppercase tracking-[0.2em] text-[#00A86B]">
          World Bank DARES Programme · Nigeria · 2026
        </p>

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

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-[#00A86B] px-6 py-3 font-semibold tracking-wide text-white transition-all duration-200 hover:bg-[#00A86B]/90"
          >
            Open DARES Dashboard
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/marketplace/overview"
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold tracking-wide text-white transition-all duration-200 hover:bg-white/10"
          >
            Browse Marketplace
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Honest positioning line */}
        <p className="mt-5 text-center text-xs text-slate-500">
          Platform currently in active development. Access by invitation only.
        </p>

        {/* Product Cards */}
        <div className="mt-14 grid w-full max-w-3xl gap-5 sm:grid-cols-2">
          {/* DARES Card */}
          <div className="flex flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 text-left backdrop-blur-sm">
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
          </div>

          {/* Marketplace Card */}
          <div className="flex flex-col items-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-7 text-left backdrop-blur-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00A86B]/30 bg-[#00A86B]/15">
              <TrendingUp className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
            </div>
            <h2 className="font-display text-xl font-bold text-white">Marketplace</h2>
            <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#00A86B]">
              Investor–Developer Platform
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Connect IFC-screened solar developers with DFIs, commercial banks, and impact investors
              through credit-scored project profiles.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3: Programme Context Strip ──────────────────────── */}
      <section className="border-t border-white/[0.08] py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-12 sm:grid-cols-2">
            {/* Left — programme description */}
            <p className="text-sm leading-relaxed text-slate-300">
              The DARES programme is a $750M World Bank initiative to scale distributed renewable
              energy access across Nigeria. SEF-DP provides the digital infrastructure for
              application management, claims verification, and investment matching.
            </p>

            {/* Right — clean data points */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="font-mono text-2xl text-white">847</p>
                <p className="mt-1 text-sm text-slate-400">Active project applications</p>
              </div>
              <div>
                <p className="font-mono text-2xl text-white">$750M</p>
                <p className="mt-1 text-sm text-slate-400">Total programme value</p>
              </div>
              <div>
                <p className="font-mono text-2xl text-white">6</p>
                <p className="mt-1 text-sm text-slate-400">Financing windows managed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Who Is This For ───────────────────────────────── */}
      <section id="platform" className="bg-white/5 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Built for every stakeholder in the energy access ecosystem
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Left — Programme Management */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 border-l-2 border-l-[#00A86B]/30">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00A86B]/30 bg-[#00A86B]/15">
                <Zap className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Programme Management
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#00A86B]">
                DARES Portfolio Management
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Track projects from application to disbursement',
                  'Automated claims verification with PAYGO calculations',
                  'Real-time KPI dashboards for World Bank reporting',
                  'Full audit trail for every disbursement decision',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Investment & Matching */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 border-l-2 border-l-[#00A86B]/30">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00A86B]/30 bg-[#00A86B]/15">
                <TrendingUp className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                Investment &amp; Matching
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#00A86B]">
                SEF-DP Marketplace
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Browse IFC-screened, credit-scored solar projects',
                  'Verified developer profiles with audited track records',
                  'Match with DFIs, commercial banks, and impact funds',
                  'Structured due diligence documentation built-in',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="mt-0.5 shrink-0 text-slate-400" aria-hidden="true">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Compliance Strip ──────────────────────────────── */}
      <section id="about" className="border-t border-white/[0.08] py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid divide-y divide-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* Item 1 — NDPA */}
            <div className="flex flex-col items-center gap-2 py-8 text-center sm:px-8 sm:py-0">
              <ShieldCheck className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
              <p className="font-medium text-white">Nigerian NDPA Compliant</p>
              <p className="text-xs text-slate-400">Data residency and privacy standards</p>
            </div>

            {/* Item 2 — World Bank reference */}
            <div className="flex flex-col items-center gap-2 py-8 text-center sm:px-8 sm:py-0">
              <FileCheck className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
              <p className="font-medium text-white">World Bank Programme</p>
              <p className="font-mono text-xs text-[#00A86B]">DARES RFQ/2026/61763</p>
            </div>

            {/* Item 3 — Audit trail */}
            <div className="flex flex-col items-center gap-2 py-8 text-center sm:px-8 sm:py-0">
              <Lock className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
              <p className="font-medium text-white">Audit Trail</p>
              <p className="text-xs text-slate-400">Every disbursement action logged</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 6: Footer ────────────────────────────────────────── */}
      <footer id="contact" className="border-t border-white/10 bg-[#050F1A] py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {/* Brand */}
            <div>
              <p className="font-display text-lg font-bold text-white">SEF-DP</p>
              <p className="mt-1 text-sm text-slate-400">
                Sustainable Energy Finance Developer Platform
              </p>
              <p className="mt-2 text-xs text-slate-500">
                Nigerian NDPA Compliant · World Bank DARES Programme
              </p>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Contact Us', href: '#' },
                { label: 'About', href: '#' },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Version + compliance */}
            <div className="sm:text-right">
              <p className="font-mono text-xs text-[#00A86B]/50">SEF-DP v1.0-beta</p>
              <p className="mt-1 text-xs text-slate-500">
                All data subject to Nigerian NDPA and World Bank data governance policies
              </p>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-6 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-slate-500">
              © 2026 SEF-DP Platform · Built for Africa&apos;s energy transition
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
