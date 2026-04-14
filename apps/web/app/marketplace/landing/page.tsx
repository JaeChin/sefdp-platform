"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function MarketplaceLandingPage() {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    function countUp(id: string, target: number, prefix = "", suffix = "", decimals = 0) {
      const counterEl = document.getElementById(id);
      if (!counterEl) return;
      const start = performance.now();
      const duration = 1800;
      function update(now: number) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = eased * target;
        counterEl!.textContent = prefix + (decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toString()) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        countUp("stat-projects", 42);
        countUp("stat-capital", 4.2, "\u20A6", "B", 1);
        countUp("stat-financiers", 9);
        countUp("stat-matches", 31);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">

      {/* Amber top accent bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 z-50" style={{ background: "#F5C200" }} />

      {/* Layer 1 — Hero photo */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "url(/images/hero-solar-sunset.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          transform: "scale(1.05)",
          transformOrigin: "center center",
          willChange: "transform",
        }} />
      </div>

      {/* Layer 2 — Warm dark overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 1,
        background: "linear-gradient(180deg, rgba(13,30,45,0.85) 0%, rgba(13,30,45,0.75) 50%, rgba(8,20,32,0.94) 100%)",
      }} />

      {/* Layer 3 — Amber grid texture */}
      <div className="fixed inset-0 pointer-events-none" style={{
        zIndex: 2,
        backgroundImage: "linear-gradient(rgba(245,194,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,194,0,0.04) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* Nav */}
      <nav className="relative flex items-center justify-between px-10 py-5 border-b border-white/10 mt-0.5" style={{
        zIndex: 10,
        background: "rgba(13,30,45,0.6)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>SEF-DP</span>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#F5C200" }} />
        </div>
        <div className="flex items-center gap-3">
          {/* TODO: replace with <Image> when SEforALL logo asset arrives */}
          <div className="flex items-center gap-1.5 border border-white/20 rounded px-2.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F5C200" }} />
            <span className="text-xs text-white/60">SEforALL Partner Platform</span>
          </div>
          <Link href="/login/marketplace" className="text-sm font-semibold px-4 py-2 rounded-lg transition-colors" style={{ background: "#F5C200", color: "#0D3349" }}>
            Sign In
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative flex-1 flex flex-col justify-center items-center text-center px-8 py-24 w-full overflow-hidden" style={{ zIndex: 10 }}>

        <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-3 py-1.5 mb-8 mx-auto"
          style={{ animation: "fadeUp 0.6s ease forwards", opacity: 0, animationDelay: "0.1s" }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#F5C200" }} />
          <span className="text-xs text-white/60 font-medium">NDPA Compliant · SEforALL</span>
        </div>

        <h1 className="text-6xl font-bold text-white leading-[1.08] tracking-tight mb-6"
          style={{ fontFamily: "'Sora', sans-serif", animation: "fadeUp 0.7s ease forwards", opacity: 0, animationDelay: "0.25s" }}>
          Where African Energy<br />
          <span style={{ color: "#F5C200" }}>Projects</span> Meet Capital
        </h1>

        <p className="text-lg text-white/60 mb-10 leading-relaxed max-w-xl mx-auto"
          style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0, animationDelay: "0.4s" }}>
          Pre-screened developers. Pre-qualified DFIs and commercial banks.
          One platform purpose-built for Nigeria&apos;s energy transition.
        </p>

        <div className="flex items-center justify-center gap-4"
          style={{ animation: "fadeUp 0.7s ease forwards", opacity: 0, animationDelay: "0.55s" }}>
          <Link href="/login/marketplace"
            className="font-semibold px-7 py-3.5 rounded-lg text-sm transition-all"
            style={{ background: "#F5C200", color: "#0D3349", animation: "amberPulse 3s ease infinite" }}>
            Access the Marketplace →
          </Link>
          <Link href="/marketplace/regulator"
            className="border border-white/25 text-white/75 font-semibold px-7 py-3.5 rounded-lg hover:border-white/50 hover:text-white transition-colors text-sm"
            style={{ backdropFilter: "blur(8px)", background: "rgba(255,255,255,0.05)" }}>
            CBN Regulator View
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div ref={statsRef} id="stats-bar" className="relative border-t border-b border-white/10 py-5 px-10" style={{
        zIndex: 10,
        background: "rgba(13,30,45,0.6)",
        backdropFilter: "blur(8px)",
      }}>
        <div className="flex items-center justify-center max-w-3xl mx-auto gap-0">
          <div className="flex items-center gap-3 pr-8 border-r border-white/10">
            <span id="stat-projects" className="text-2xl font-bold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>42</span>
            <span className="text-xs text-white/50 leading-tight">Listed<br />Projects</span>
          </div>
          <div className="flex items-center gap-3 px-8 border-r border-white/10">
            <span id="stat-capital" className="text-2xl font-bold" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#F5C200" }}>₦4.2B</span>
            <span className="text-xs text-white/50 leading-tight">In<br />Discussion</span>
          </div>
          <div className="flex items-center gap-3 px-8 border-r border-white/10">
            <span id="stat-financiers" className="text-2xl font-bold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>9</span>
            <span className="text-xs text-white/50 leading-tight">Active<br />Financiers</span>
          </div>
          <div className="flex items-center gap-3 px-8">
            <span id="stat-matches" className="text-2xl font-bold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>31</span>
            <span className="text-xs text-white/50 leading-tight">Matches<br />Made</span>
          </div>
        </div>
      </div>

      {/* Features — two columns with ghosted photos */}
      <div className="relative grid grid-cols-2 gap-0 border-b border-white/10" style={{ zIndex: 10 }}>

        {/* Developers */}
        <div className="px-10 py-12 border-r border-white/10 relative overflow-hidden">
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "45%", height: "100%",
            backgroundImage: "url(/images/workers-installing-solar.jpg)",
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: 0.18,
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
          }} />
          <div className="relative max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#F5C200" }}>For Developers</p>
            <h3 className="text-xl font-bold text-white mb-3 leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>
              Turn your track record into investor-ready credibility
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Submit your project once. Get credit-methodology scoring verified by World Bank programme data. Matched automatically to the right DFIs and commercial banks.
            </p>
          </div>
        </div>

        {/* Financiers */}
        <div className="px-10 py-12 relative overflow-hidden">
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "45%", height: "100%",
            backgroundImage: "url(/images/solar-worker-portrait.jpg)",
            backgroundSize: "cover", backgroundPosition: "center top",
            opacity: 0.15,
            maskImage: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
            WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,0.8), transparent)",
          }} />
          <div className="relative max-w-sm">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40 mb-3">For Financiers</p>
            <h3 className="text-xl font-bold text-white mb-3 leading-snug" style={{ fontFamily: "'Sora', sans-serif" }}>
              A pre-screened pipeline, ready for deployment
            </h3>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Browse pre-screened projects with independent due diligence already completed. Filter by risk appetite, deal size, and geography. Syndicate with other institutions on larger opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Join the Platform CTA */}
      <div className="relative px-10 py-16" style={{ zIndex: 10 }}>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Sora', sans-serif" }}>
            Join the Platform
          </h2>
          <p className="text-sm text-white/50 mt-2">
            Access by invitation. Select your role to begin registration.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10 max-w-3xl mx-auto items-stretch">
          {/* Developer card */}
          <div className="flex flex-col rounded-xl p-8" style={{ background: "rgba(10,37,64,0.8)", border: "1px solid rgba(245,194,0,0.2)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#F5C200" }}>
              DEVELOPER
            </p>
            <h3 className="text-lg font-bold text-white mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
              Developer
            </h3>
            <p className="text-sm text-white/50 mt-2 leading-relaxed">
              List your project, get rated, and connect with DFIs and commercial banks.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#F5C200] mt-1.5 shrink-0" />
                <span className="text-xs text-white/40">Financier matching</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#F5C200] mt-1.5 shrink-0" />
                <span className="text-xs text-white/40">Grant track record verified</span>
              </li>
            </ul>
            <Link
              href="/register/marketplace?type=developer"
              className="block w-full rounded-lg py-2.5 text-sm font-semibold text-center mt-6"
              style={{ background: "#F5C200", color: "#0D1E2E" }}
            >
              Register as Developer →
            </Link>
          </div>

          {/* Financier card */}
          <div className="flex flex-col rounded-xl p-8" style={{ background: "rgba(10,37,64,0.8)", border: "1px solid rgba(0,168,107,0.2)" }}>
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#00A86B" }}>
              FINANCIER / DFI
            </p>
            <h3 className="text-lg font-bold text-white mt-2" style={{ fontFamily: "'Sora', sans-serif" }}>
              Financier / DFI
            </h3>
            <p className="text-sm text-white/50 mt-2 leading-relaxed">
              Browse pre-screened developer pipeline. Filter by deal size, stage, and instrument type.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                <span className="text-xs text-white/40">Pre-qualified developer pipeline</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                <span className="text-xs text-white/40">Rated projects</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1 h-1 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                <span className="text-xs text-white/40">Deal flow analytics</span>
              </li>
            </ul>
            <Link
              href="/register/marketplace?type=financier"
              className="block w-full rounded-lg py-2.5 text-sm font-semibold text-center mt-6"
              style={{ background: "#00A86B", color: "white" }}
            >
              Register as Financier →
            </Link>
          </div>
        </div>
      </div>

      {/* CBN footer */}
      <div className="relative border-t border-white/10 py-3.5 px-10 flex items-center justify-between" style={{
        zIndex: 10,
        background: "rgba(13,30,45,0.7)",
        backdropFilter: "blur(8px)",
      }}>
        <span className="text-xs text-white/35">
          Regulated under the oversight of the{" "}
          <span className="text-white/55 font-semibold">Central Bank of Nigeria</span>
        </span>
        <div className="flex items-center gap-4">
          <span className="text-[10px] text-white/30 uppercase tracking-widest">In partnership with</span>
          <img src="/logos/seforall-logo.png" alt="Sustainable Energy for All" style={{ height: 40, objectFit: 'contain', mixBlendMode: 'screen' }} />
          <div className="w-px h-4 bg-white/15" />
          <span className="text-xs text-white/45 font-semibold">Central Bank of Nigeria</span>
        </div>
      </div>

    </div>
  );
}
