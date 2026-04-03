"use client";

import Link from "next/link";

export default function MarketplaceLandingPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0A2540" }}>

      {/* Dot grid texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Subtle radial glow behind hero */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 30% 40%, rgba(0,168,107,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-10 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>
            SEF-DP
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          {/* TODO: replace span with <Image> src="/logos/seforall.svg" when asset arrives */}
          <div className="flex items-center gap-1.5 border border-white/20 rounded px-2.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" />
            <span className="text-xs text-white/60">SEforALL Partner Platform</span>
          </div>
          <Link
            href="/login"
            className="bg-[#00A86B] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#00A86B]/90 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero — centred */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-8 py-24 w-full">
        <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-3 py-1.5 mb-8 mx-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" />
          <span className="text-xs text-white/60 font-medium">IFC Standards · World Bank Verified · NDPA Compliant</span>
        </div>

        <h1
          className="text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Where African Energy<br />
          <span className="text-[#00A86B]">Projects</span> Meet Capital
        </h1>

        <p className="text-lg text-white/55 mb-10 leading-relaxed max-w-xl mx-auto text-center">
          IFC-screened solar developers. Pre-qualified DFIs and commercial banks.
          One platform purpose-built for Nigeria&apos;s energy transition.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/login"
            className="bg-[#00A86B] text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-[#00A86B]/90 transition-colors text-sm"
          >
            Access the Marketplace →
          </Link>
          <Link
            href="/marketplace/regulator"
            className="border border-white/20 text-white/70 font-semibold px-7 py-3.5 rounded-lg hover:border-white/40 hover:text-white transition-colors text-sm"
          >
            CBN Regulator View
          </Link>
        </div>
      </div>

      {/* Inline data strip — replaces floating stat boxes */}
      <div className="relative z-10 border-t border-b border-white/10 py-4 px-10">
        <div className="flex items-center justify-center gap-0 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 pr-8 border-r border-white/10">
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>42</span>
            <span className="text-xs text-white/50 leading-tight">Listed<br />Projects</span>
          </div>
          <div className="flex items-center gap-3 px-8 border-r border-white/10">
            <span className="text-2xl font-bold text-[#00A86B]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>₦4.2B</span>
            <span className="text-xs text-white/50 leading-tight">In<br />Discussion</span>
          </div>
          <div className="flex items-center gap-3 px-8 border-r border-white/10">
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>9</span>
            <span className="text-xs text-white/50 leading-tight">Active<br />Financiers</span>
          </div>
          <div className="flex items-center gap-3 px-8">
            <span className="text-2xl font-bold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>31</span>
            <span className="text-xs text-white/50 leading-tight">Matches<br />Made</span>
          </div>
        </div>
      </div>

      {/* Two-column audience section — proper role split, no bullet lists */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-2 gap-0 border-b border-white/10">

        {/* Solar Developers */}
        <div className="px-10 py-12 border-r border-white/10">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#00A86B]/15 border border-[#00A86B]/30 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-[#00A86B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
              </svg>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#00A86B] mb-3">For Solar Developers</p>
            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              Turn your track record into investor-ready credibility
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Submit your project once. Get IFC-methodology credit scoring, verified by World Bank programme data. Matched automatically to the right DFIs and commercial banks.
            </p>
            <Link
              href="/register"
              className="text-sm font-semibold text-[#00A86B] hover:text-[#00A86B]/80 transition-colors"
            >
              Request developer access →
            </Link>
          </div>
        </div>

        {/* Financiers */}
        <div className="px-10 py-12">
          <div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/15 flex items-center justify-center mb-5">
              <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
              </svg>
            </div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">For Financiers</p>
            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "'Sora', sans-serif" }}>
              A pre-screened pipeline, ready for deployment
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Browse IFC-screened projects with due diligence already completed. Filter by risk appetite, deal size, and geography. Syndicate with other institutions on larger opportunities.
            </p>
            <Link
              href="/register"
              className="text-sm font-semibold text-white/60 hover:text-white transition-colors"
            >
              Request financier access →
            </Link>
          </div>
        </div>
      </div>

      {/* CBN footer */}
      <div className="relative z-10 border-t border-white/10 py-3.5 px-10 flex items-center justify-between">
        <span className="text-xs text-white/35">
          Regulated under the oversight of the{" "}
          <span className="text-white/55 font-semibold">Central Bank of Nigeria</span>
        </span>
        {/* TODO: replace with <Image> src="/logos/cbn.svg" when asset arrives */}
        <span className="text-xs text-white/25 font-mono tracking-wide">CBN · In Partnership</span>
      </div>
    </div>
  );
}
