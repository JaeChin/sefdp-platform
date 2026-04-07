'use client';

import { PageHeader } from '@/components/shared/page-header';
import { MatchCard, type MatchDimension } from '@/components/marketplace/MatchCard';

const MATCH_DATA: Array<{
  developerProject: string;
  projectType: string;
  financier: string;
  financierType: string;
  overallScore: number;
  status: "In Discussion" | "Interested" | "New Match";
  dimensions: MatchDimension[];
}> = [
  {
    developerProject: "Kano North Mini-Grid Expansion",
    projectType: "Mini-grid",
    financier: "Emmanuel Financiers",
    financierType: "Impact Fund",
    overallScore: 91,
    status: "In Discussion",
    dimensions: [
      { label: "Project Type Alignment",  score: 95,  weight: "primary" },
      { label: "Deal Size Compatibility", score: 88,  weight: "primary" },
      { label: "Geography Match",         score: 100, weight: "secondary" },
      { label: "Instrument Preference",   score: 87,  weight: "secondary" },
      { label: "Risk Appetite Alignment", score: 92,  weight: "primary" },
      { label: "Development Stage",       score: 85,  weight: "secondary" },
      { label: "Impact Criteria",         score: 90,  weight: "secondary" },
    ],
  },
  {
    developerProject: "Borno Rural Cluster Phase II",
    projectType: "Mini-grid",
    financier: "Africa Financiers Institute",
    financierType: "DFI",
    overallScore: 87,
    status: "New Match",
    dimensions: [
      { label: "Project Type Alignment",  score: 91, weight: "primary" },
      { label: "Deal Size Compatibility", score: 84, weight: "primary" },
      { label: "Geography Match",         score: 96, weight: "secondary" },
      { label: "Instrument Preference",   score: 83, weight: "secondary" },
      { label: "Risk Appetite Alignment", score: 88, weight: "primary" },
      { label: "Development Stage",       score: 81, weight: "secondary" },
      { label: "Impact Criteria",         score: 86, weight: "secondary" },
    ],
  },
  {
    developerProject: "Enugu Industrial Solar Park",
    projectType: "C&I",
    financier: "NSIA",
    financierType: "DFI",
    overallScore: 82,
    status: "Interested",
    dimensions: [
      { label: "Project Type Alignment",  score: 86, weight: "primary" },
      { label: "Deal Size Compatibility", score: 79, weight: "primary" },
      { label: "Geography Match",         score: 90, weight: "secondary" },
      { label: "Instrument Preference",   score: 78, weight: "secondary" },
      { label: "Risk Appetite Alignment", score: 83, weight: "primary" },
      { label: "Development Stage",       score: 77, weight: "secondary" },
      { label: "Impact Criteria",         score: 81, weight: "secondary" },
    ],
  },
  {
    developerProject: "Ogun Peri-Urban Grid",
    projectType: "Hybrid",
    financier: "Sterling Bank",
    financierType: "Commercial Bank",
    overallScore: 79,
    status: "In Discussion",
    dimensions: [
      { label: "Project Type Alignment",  score: 82, weight: "primary" },
      { label: "Deal Size Compatibility", score: 76, weight: "primary" },
      { label: "Geography Match",         score: 87, weight: "secondary" },
      { label: "Instrument Preference",   score: 76, weight: "secondary" },
      { label: "Risk Appetite Alignment", score: 80, weight: "primary" },
      { label: "Development Stage",       score: 74, weight: "secondary" },
      { label: "Impact Criteria",         score: 78, weight: "secondary" },
    ],
  },
  {
    developerProject: "Niger State SHS Programme",
    projectType: "SHS",
    financier: "Emmanuel Financiers",
    financierType: "Impact Fund",
    overallScore: 74,
    status: "New Match",
    dimensions: [
      { label: "Project Type Alignment",  score: 77, weight: "primary" },
      { label: "Deal Size Compatibility", score: 72, weight: "primary" },
      { label: "Geography Match",         score: 81, weight: "secondary" },
      { label: "Instrument Preference",   score: 71, weight: "secondary" },
      { label: "Risk Appetite Alignment", score: 75, weight: "primary" },
      { label: "Development Stage",       score: 69, weight: "secondary" },
      { label: "Impact Criteria",         score: 73, weight: "secondary" },
    ],
  },
];

export default function MatchingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Matching"
        description="View and manage matches between developers and financiers based on project criteria."
      />

      {/* Summary stat cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">Active Matches</p>
          <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>5</p>
          <p className="text-xs text-slate-500 mt-1">across 4 financier types</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">In Discussion</p>
          <p className="text-2xl font-bold text-slate-900" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>₦4.2B</p>
          <p className="text-xs text-slate-500 mt-1">combined deal value</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">New This Week</p>
          <p className="text-2xl font-bold text-[#00A86B]" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>2</p>
          <p className="text-xs text-slate-500 mt-1">+1 syndication opportunity</p>
        </div>
      </div>

      {/* Syndication Opportunities */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Syndication Opportunities
        </h2>

        <div className="relative rounded-xl border border-[#00A86B]/20 bg-[#00A86B]/5 p-6">
          {/* Syndication badge */}
          <span className="absolute right-5 top-5 inline-flex items-center rounded-full bg-[#00A86B]/10 px-3 py-1 text-xs font-semibold text-[#00A86B] ring-1 ring-[#00A86B]/30">
            Syndication Opportunity
          </span>

          {/* Header */}
          <div className="mb-5 pr-44">
            <p className="text-lg font-semibold text-[#0A2540] leading-snug">
              Kano North Mini-Grid Expansion
            </p>
            <p className="mt-1 font-mono text-sm text-slate-500">₦2.1B total financing needed</p>
          </div>

          {/* Syndicate members */}
          <div className="mb-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Syndicate Members
            </p>

            {/* Stacked allocation bar */}
            <div className="flex w-full h-2.5 rounded-full overflow-hidden mb-4 mt-2">
              <div
                className="bg-[#00A86B] transition-all duration-700"
                style={{ width: "40%" }}
                title="Emmanuel Financiers — 40% · ₦840M"
              />
              <div
                className="bg-[#0A2540] transition-all duration-700"
                style={{ width: "35%" }}
                title="NSIA — 35% · ₦735M"
              />
              <div
                className="bg-slate-400 transition-all duration-700"
                style={{ width: "25%" }}
                title="Sterling Bank — 25% · ₦525M"
              />
            </div>

            {/* Colour key */}
            <div className="flex items-center gap-4 mb-3">
              <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <span className="w-2 h-2 rounded-sm bg-[#00A86B] shrink-0" />Emmanuel 40%
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <span className="w-2 h-2 rounded-sm bg-[#0A2540] shrink-0" />NSIA 35%
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <span className="w-2 h-2 rounded-sm bg-slate-400 shrink-0" />Sterling 25%
              </span>
            </div>

            <div className="space-y-2.5">
              {/* Emmanuel Financiers */}
              <div className="flex items-center gap-3">
                <span className="text-[#00A86B] text-xs leading-none">●</span>
                <span className="flex-1 min-w-0 text-sm font-medium text-[#0A2540]">
                  Emmanuel Financiers
                </span>
                <span className="font-mono text-xs text-slate-500 shrink-0">40%</span>
                <span className="text-slate-300 text-xs shrink-0">—</span>
                <span className="font-mono text-sm font-semibold text-[#0A2540] shrink-0 w-14 text-right">
                  ₦840M
                </span>
                <span className="font-mono text-sm font-bold text-[#00A86B] shrink-0 w-20 text-right">
                  91% match
                </span>
              </div>

              {/* NSIA */}
              <div className="flex items-center gap-3">
                <span className="text-[#00A86B] text-xs leading-none">●</span>
                <span className="flex-1 min-w-0 text-sm font-medium text-[#0A2540]">
                  NSIA
                </span>
                <span className="font-mono text-xs text-slate-500 shrink-0">35%</span>
                <span className="text-slate-300 text-xs shrink-0">—</span>
                <span className="font-mono text-sm font-semibold text-[#0A2540] shrink-0 w-14 text-right">
                  ₦735M
                </span>
                <span className="font-mono text-sm font-bold text-[#00A86B] shrink-0 w-20 text-right">
                  87% match
                </span>
              </div>

              {/* Sterling Bank */}
              <div className="flex items-center gap-3">
                <span className="text-[#00A86B] text-xs leading-none">●</span>
                <span className="flex-1 min-w-0 text-sm font-medium text-[#0A2540]">
                  Sterling Bank
                </span>
                <span className="font-mono text-xs text-slate-500 shrink-0">25%</span>
                <span className="text-slate-300 text-xs shrink-0">—</span>
                <span className="font-mono text-sm font-semibold text-[#0A2540] shrink-0 w-14 text-right">
                  ₦525M
                </span>
                <span className="font-mono text-sm font-bold text-[#00A86B] shrink-0 w-20 text-right">
                  79% match
                </span>
              </div>
            </div>
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between border-t border-[#00A86B]/15 pt-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00A86B]/10 px-3 py-1 text-xs font-semibold text-[#00A86B]">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                  clipRule="evenodd"
                />
              </svg>
              Combined coverage: 100%
            </span>
            <button className="rounded-lg border border-[#00A86B]/30 bg-white px-4 py-1.5 text-xs font-medium text-[#00A86B] transition-colors hover:bg-[#00A86B]/5">
              View Syndication Details
            </button>
          </div>
        </div>
      </div>

      {/* Individual Matches */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">
          Individual Matches
        </h2>
        <div className="space-y-4">
          {MATCH_DATA.map((match) => (
            <MatchCard key={`${match.developerProject}-${match.financier}`} {...match} />
          ))}
        </div>
      </section>

      {/* Projects Awaiting Match */}
      <div className="space-y-4">
        <h2 className="text-base font-semibold text-[#0A2540]">Projects Awaiting Match</h2>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 shadow-sm">
          {/* Card header */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Developer Project
              </p>
              <p className="mt-1 font-semibold text-[#0A2540]">Niger State SHS Programme</p>
              <p className="mt-0.5 text-sm text-slate-500">Rubitec Solar</p>
              <span className="mt-1.5 inline-block font-mono text-sm font-semibold text-[#0A2540]">
                ₦420M
              </span>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Awaiting Match
            </span>
          </div>

          {/* Suggested actions */}
          <div className="mt-5">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Suggested Actions
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-[#0A2540] transition-colors hover:border-[#0A2540]/30 hover:bg-slate-50">
                Expand geography criteria
              </button>
              <button className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-[#0A2540] transition-colors hover:border-[#0A2540]/30 hover:bg-slate-50">
                Adjust deal size range
              </button>
              <button className="rounded-full border border-[#00A86B]/30 bg-[#00A86B]/5 px-3.5 py-1.5 text-xs font-medium text-[#00A86B] transition-colors hover:bg-[#00A86B]/10">
                Request manual review →
              </button>
            </div>
          </div>

          {/* Helper text */}
          <p className="mt-5 border-t border-amber-500/10 pt-4 text-sm text-slate-400">
            No financiers currently match your criteria. Our team reviews unmatched projects weekly
            and will reach out with recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
