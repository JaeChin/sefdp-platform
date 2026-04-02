'use client';

import { useEffect, useState } from 'react';
import { ArrowLeftRight, Clock, MessageCircle, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';

type MatchStatus = 'in_discussion' | 'new_match' | 'interested';

const matchStatusConfig: Record<
  MatchStatus,
  { label: string; icon: React.ElementType; classes: string }
> = {
  in_discussion: {
    label: 'In Discussion',
    icon: MessageCircle,
    classes: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  new_match: {
    label: 'New Match',
    icon: Sparkles,
    classes: 'bg-[#00A86B]/10 text-[#00A86B] border border-[#00A86B]/20',
  },
  interested: {
    label: 'Interested',
    icon: Clock,
    classes: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
};

interface BreakdownDimension {
  label: string;
  value: number;
}

interface Match {
  id: string;
  projectName: string;
  projectType: string;
  financierName: string;
  financierType: string;
  matchScore: number;
  status: MatchStatus;
  breakdown: BreakdownDimension[];
}

/**
 * Base breakdown for a ~91% overall match (unweighted average of 7 dimensions).
 * Each match's values are scaled proportionally so their average equals matchScore.
 */
const BASE_BREAKDOWN: BreakdownDimension[] = [
  { label: 'Project Type Alignment', value: 95 },
  { label: 'Deal Size Compatibility', value: 88 },
  { label: 'Geography Match', value: 100 },
  { label: 'Instrument Preference', value: 87 },
  { label: 'Risk Appetite Alignment', value: 92 },
  { label: 'Development Stage', value: 85 },
  { label: 'Impact Criteria', value: 90 },
];

const BASE_AVERAGE =
  BASE_BREAKDOWN.reduce((sum, d) => sum + d.value, 0) / BASE_BREAKDOWN.length;

function scaleBreakdown(targetScore: number): BreakdownDimension[] {
  const ratio = targetScore / BASE_AVERAGE;
  return BASE_BREAKDOWN.map((d) => ({
    label: d.label,
    value: Math.min(100, Math.round(d.value * ratio)),
  }));
}

const matchData: Match[] = [
  {
    id: 'M-001',
    projectName: 'Kano North Mini-Grid Expansion',
    projectType: 'Mini-grid',
    financierName: 'CrossBoundary Energy Access',
    financierType: 'Impact Fund',
    matchScore: 91,
    status: 'in_discussion',
    breakdown: scaleBreakdown(91),
  },
  {
    id: 'M-002',
    projectName: 'Enugu Industrial Solar Park',
    projectType: 'C&I',
    financierName: 'British International Investment',
    financierType: 'DFI',
    matchScore: 87,
    status: 'interested',
    breakdown: scaleBreakdown(87),
  },
  {
    id: 'M-003',
    projectName: 'Borno Rural Cluster Phase II',
    projectType: 'Mini-grid',
    financierName: 'Africa Finance Corporation',
    financierType: 'DFI',
    matchScore: 82,
    status: 'new_match',
    breakdown: scaleBreakdown(82),
  },
  {
    id: 'M-004',
    projectName: 'Ogun Peri-Urban Grid',
    projectType: 'Hybrid',
    financierName: 'Stanbic IBTC',
    financierType: 'Commercial Bank',
    matchScore: 79,
    status: 'in_discussion',
    breakdown: scaleBreakdown(79),
  },
  {
    id: 'M-005',
    projectName: 'Niger State SHS Programme',
    projectType: 'SHS',
    financierName: 'CrossBoundary Energy Access',
    financierType: 'Impact Fund',
    matchScore: 74,
    status: 'new_match',
    breakdown: scaleBreakdown(74),
  },
];

function MatchStatusBadge({ status }: { status: MatchStatus }) {
  const config = matchStatusConfig[status];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${config.classes}`}
    >
      <Icon className="h-3 w-3" />
      {config.label}
    </span>
  );
}

function BreakdownRow({
  label,
  value,
  index,
  animate,
}: {
  label: string;
  value: number;
  index: number;
  animate: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      {/* Label */}
      <span className="w-44 shrink-0 text-xs text-slate-400">{label}</span>

      {/* Progress track */}
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full"
          style={{
            backgroundColor: '#00A86B',
            width: animate ? `${value}%` : '0%',
            transition: `width 600ms ease-out ${index * 60}ms`,
          }}
        />
      </div>

      {/* Percentage */}
      <span className="w-9 shrink-0 text-right font-mono text-xs text-white">{value}%</span>
    </div>
  );
}

function MatchBreakdownPanel({
  breakdown,
  matchScore,
}: {
  breakdown: BreakdownDimension[];
  matchScore: number;
}) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Small delay lets the browser paint the panel before bars grow
    const timer = setTimeout(() => setAnimate(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-4 rounded-lg bg-[#0A2540] px-5 py-4">
      {/* Overall score */}
      <div className="mb-4 flex items-baseline gap-2.5">
        <span className="font-mono text-3xl font-bold leading-none" style={{ color: '#00A86B' }}>
          {matchScore}%
        </span>
        <span className="text-xs font-medium uppercase tracking-wide text-slate-400">
          Overall Match Score
        </span>
      </div>

      {/* 7-dimension breakdown rows */}
      <div className="space-y-2.5">
        {breakdown.map((dim, i) => (
          <BreakdownRow
            key={dim.label}
            label={dim.label}
            value={dim.value}
            index={i}
            animate={animate}
          />
        ))}
      </div>
    </div>
  );
}

function MatchCard({ match }: { match: Match }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {/* Top row: project ↔ financier */}
      <div className="flex items-center gap-4">
        {/* Project side */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Developer Project
          </p>
          <p className="mt-1 truncate font-semibold text-[#0A2540]">{match.projectName}</p>
          <span className="mt-1.5 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {match.projectType}
          </span>
        </div>

        {/* Center icon */}
        <div className="flex flex-col items-center gap-1.5 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A2540]/5">
            <ArrowLeftRight className="h-5 w-5 text-[#0A2540]" />
          </div>
        </div>

        {/* Financier side */}
        <div className="min-w-0 flex-1 text-right">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Financier</p>
          <p className="mt-1 truncate font-semibold text-[#0A2540]">{match.financierName}</p>
          <span className="mt-1.5 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {match.financierType}
          </span>
        </div>
      </div>

      {/* Breakdown panel with animated bars */}
      <MatchBreakdownPanel breakdown={match.breakdown} matchScore={match.matchScore} />

      {/* Footer row */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
        <MatchStatusBadge status={match.status} />
        <button className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-[#0A2540] transition-colors hover:bg-slate-50">
          View Match
        </button>
      </div>
    </div>
  );
}

export default function MatchingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Matching"
        description="View and manage matches between developers and financiers based on project criteria."
      />

      {/* Summary bar */}
      <div className="flex items-center gap-6 rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
        <span className="font-mono text-sm font-semibold text-[#0A2540]">5</span>
        <span className="text-sm text-slate-500">active matches</span>
        <span className="h-4 w-px bg-slate-200" />
        <span className="font-mono text-sm font-semibold text-[#0A2540]">₦4.2B</span>
        <span className="text-sm text-slate-500">in discussion</span>
        <span className="h-4 w-px bg-slate-200" />
        <span className="font-mono text-sm font-semibold text-[#00A86B]">2</span>
        <span className="text-sm text-slate-500">new this week</span>
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
            <div className="space-y-2.5">
              {/* CrossBoundary */}
              <div className="flex items-center gap-3">
                <span className="text-[#00A86B] text-xs leading-none">●</span>
                <span className="flex-1 min-w-0 text-sm font-medium text-[#0A2540]">
                  CrossBoundary Energy Access
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

              {/* British International Investment */}
              <div className="flex items-center gap-3">
                <span className="text-[#00A86B] text-xs leading-none">●</span>
                <span className="flex-1 min-w-0 text-sm font-medium text-[#0A2540]">
                  British International Investment
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

              {/* Stanbic IBTC */}
              <div className="flex items-center gap-3">
                <span className="text-[#00A86B] text-xs leading-none">●</span>
                <span className="flex-1 min-w-0 text-sm font-medium text-[#0A2540]">
                  Stanbic IBTC
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
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Individual Matches
        </h2>
      </div>

      {/* Match cards */}
      <div className="space-y-4">
        {matchData.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

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
