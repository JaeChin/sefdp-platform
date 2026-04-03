export default function MarketplaceLandingPage() {
  return (
    <div className="min-h-screen bg-[#0A2540] flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg tracking-tight" style={{ fontFamily: "'Sora', sans-serif" }}>SEF-DP</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] animate-pulse" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 border border-white/20 rounded px-2.5 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" />
            <span className="text-xs text-white/60">SEforALL Partner Platform</span>
          </div>
          <a href="/login" className="bg-[#00A86B] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#00A86B]/90 transition-colors">
            Sign In
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto px-8 py-24">
          <div className="inline-flex items-center gap-2 border border-white/20 rounded-full px-3 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B]" />
            <span className="text-xs text-white/60 font-medium">IFC Standards · World Bank Verified · NDPA Compliant</span>
          </div>
          <h1 style={{ fontFamily: "'Sora', sans-serif" }} className="text-5xl font-bold text-white leading-tight mb-6">
            Where African Energy<br />Projects Meet Capital
          </h1>
          <p className="text-lg text-white/60 mb-10 leading-relaxed">
            IFC-screened solar developers. Pre-qualified DFIs and commercial banks.
            One platform built for Nigeria&apos;s energy transition.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="/login" className="bg-[#00A86B] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#00A86B]/90 transition-colors">
              Access the Marketplace →
            </a>
            <a href="/marketplace/regulator" className="border border-white/20 text-white/70 font-semibold px-6 py-3 rounded-lg hover:border-white/40 hover:text-white transition-colors">
              CBN Regulator View
            </a>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto px-8">
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-center">
            <div className="text-3xl font-bold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>42</div>
            <div className="text-sm text-white/50 mt-1">Listed Projects</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-center">
            <div className="text-3xl font-bold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>₦4.2B</div>
            <div className="text-sm text-white/50 mt-1">In Discussion</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-6 py-5 text-center">
            <div className="text-3xl font-bold text-white" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>9</div>
            <div className="text-sm text-white/50 mt-1">Active Financiers</div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto py-16 px-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>For Solar Developers</h2>
            <div className="space-y-3">
              <p className="flex items-start gap-2 text-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                IFC-methodology credit scoring
              </p>
              <p className="flex items-start gap-2 text-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                Verified track record builds investor confidence
              </p>
              <p className="flex items-start gap-2 text-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                Matched to DFIs and commercial banks automatically
              </p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h2 className="text-xl font-bold text-white mb-4" style={{ fontFamily: "'Sora', sans-serif" }}>For Financiers</h2>
            <div className="space-y-3">
              <p className="flex items-start gap-2 text-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                Pre-screened project pipeline
              </p>
              <p className="flex items-start gap-2 text-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                IFC due diligence already completed
              </p>
              <p className="flex items-start gap-2 text-white/60 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] mt-1.5 shrink-0" />
                Deal structuring and syndication support
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* CBN compliance footer */}
      <div className="border-t border-white/10 py-4 px-8 flex items-center justify-between">
        <span className="text-xs text-white/40">Regulated under the oversight of the <span className="text-white/60 font-semibold">Central Bank of Nigeria</span></span>
        <span className="text-xs text-white/30 font-mono">CBN · In Partnership</span>
      </div>
    </div>
  );
}
