import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, Store, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#0A2540]">

      {/* ── Section 1: Navigation Header ────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#0A2540]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-white">SEF-DP</span>
            <span className="h-2 w-2 rounded-full bg-[#00A86B]" aria-hidden="true" />
          </div>

          {/* Center nav links — hidden on mobile */}
          <div className="hidden items-center gap-8 md:flex">
            <a href="#platform" className="text-sm text-slate-300 transition-colors hover:text-white">
              Platform
            </a>
            <a href="#about" className="text-sm text-slate-300 transition-colors hover:text-white">
              About
            </a>
            <a href="#contact" className="text-sm text-slate-300 transition-colors hover:text-white">
              Contact
            </a>
          </div>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition-colors hover:bg-white/10"
            >
              Request Access
            </a>
            <Link
              href="/dashboard"
              className="rounded-lg bg-[#00A86B] px-4 py-2 text-sm text-white transition-colors hover:bg-[#00A86B]/90"
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Section 2: Hero ──────────────────────────────────────────── */}
      <section className="flex flex-col items-center px-6 pb-16 pt-24 text-center">
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

        {/* CTA buttons */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/dashboard"
            className="rounded-lg bg-[#00A86B] px-6 py-3 font-medium text-white transition-colors hover:bg-[#00A86B]/90"
          >
            Open DARES Dashboard
          </Link>
          <Link
            href="/marketplace/overview"
            className="rounded-lg border border-white/30 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            Browse Marketplace
          </Link>
        </div>

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
      </section>

      {/* ── Section 3: Stats ─────────────────────────────────────────── */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-8">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            <div className="border-t-2 border-[#00A86B] pt-4 text-center">
              <p className="font-mono text-3xl font-bold text-white">$750M</p>
              <p className="mt-1 text-sm text-slate-400">DARES Programme Value</p>
            </div>
            <div className="border-t-2 border-[#00A86B] pt-4 text-center">
              <p className="font-mono text-3xl font-bold text-white">847</p>
              <p className="mt-1 text-sm text-slate-400">Active Projects</p>
            </div>
            <div className="border-t-2 border-[#00A86B] pt-4 text-center">
              <p className="font-mono text-3xl font-bold text-white">₦44B+</p>
              <p className="mt-1 text-sm text-slate-400">Disbursements Tracked</p>
            </div>
            <div className="border-t-2 border-[#00A86B] pt-4 text-center">
              <p className="font-mono text-3xl font-bold text-white">9</p>
              <p className="mt-1 text-sm text-slate-400">Institutional Financiers</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Who Is This For? ──────────────────────────────── */}
      <section id="platform" className="bg-white/5 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Built for every stakeholder in the energy access ecosystem
          </h2>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Left — Programme Managers */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00A86B]/30 bg-[#00A86B]/15">
                <Zap className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                For Programme Managers
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-[#00A86B]">
                DARES Portfolio Management
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Track 847+ projects from application to disbursement',
                  'Automated claims verification with PAYGO calculations',
                  'Real-time KPI dashboards for World Bank reporting',
                  'Full audit trail for every disbursement decision',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00A86B]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/dashboard"
                className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#00A86B] transition-colors hover:text-[#00A86B]/80"
              >
                Open Dashboard →
              </Link>
            </div>

            {/* Right — Investors & Developers */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#00A86B]/30 bg-[#00A86B]/15">
                <TrendingUp className="h-6 w-6 text-[#00A86B]" aria-hidden="true" />
              </div>
              <h3 className="font-display text-xl font-bold text-white">
                For Investors &amp; Developers
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
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#00A86B]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/marketplace/overview"
                className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#00A86B] transition-colors hover:text-[#00A86B]/80"
              >
                Browse Marketplace →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Trust Signals ─────────────────────────────────── */}
      <section id="about" className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <p className="mb-8 text-center text-sm uppercase tracking-wider text-slate-400">
            Operated in partnership with
          </p>

          {/* Partner badges */}
          <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
            {[
              'World Bank Group',
              'IFC',
              'SEforALL',
              'Rural Electrification Agency Nigeria',
            ].map((partner) => (
              <span
                key={partner}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-300"
              >
                {partner}
              </span>
            ))}
          </div>

          {/* Testimonial quote */}
          <div className="mx-auto max-w-2xl rounded-xl border border-white/10 bg-white/5 p-6">
            <p className="text-base leading-relaxed text-slate-200">
              &ldquo;The use of this platform will improve value for money, transparency, economy,
              efficiency, effectiveness, integrity, and openness of the $750M Nigeria DARES
              program.&rdquo;
            </p>
            <p className="mt-4 text-sm text-slate-400">— The World Bank</p>
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
              <p className="font-mono text-xs text-slate-500">SEF-DP v2.0</p>
              <p className="mt-1 text-xs text-slate-500">
                All data subject to Nigerian NDPA and World Bank data governance policies
              </p>
            </div>
          </div>

          {/* Bottom strip */}
          <div className="mt-6 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-slate-500">
              © 2026 SEF-DP Platform. Built for Africa&apos;s energy transition.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
