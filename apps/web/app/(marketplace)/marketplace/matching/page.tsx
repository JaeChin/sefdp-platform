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

interface Match {
  id: string;
  projectName: string;
  projectType: string;
  financierName: string;
  financierType: string;
  matchScore: number;
  status: MatchStatus;
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
  },
  {
    id: 'M-002',
    projectName: 'Enugu Industrial Solar Park',
    projectType: 'C&I',
    financierName: 'British International Investment',
    financierType: 'DFI',
    matchScore: 87,
    status: 'interested',
  },
  {
    id: 'M-003',
    projectName: 'Borno Rural Cluster Phase II',
    projectType: 'Mini-grid',
    financierName: 'Africa Finance Corporation',
    financierType: 'DFI',
    matchScore: 82,
    status: 'new_match',
  },
  {
    id: 'M-004',
    projectName: 'Ogun Peri-Urban Grid',
    projectType: 'Hybrid',
    financierName: 'Stanbic IBTC',
    financierType: 'Commercial Bank',
    matchScore: 79,
    status: 'in_discussion',
  },
  {
    id: 'M-005',
    projectName: 'Niger State SHS Programme',
    projectType: 'SHS',
    financierName: 'CrossBoundary Energy Access',
    financierType: 'Impact Fund',
    matchScore: 74,
    status: 'new_match',
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

      {/* Match cards */}
      <div className="space-y-4">
        {matchData.map((match) => (
          <div
            key={match.id}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              {/* Project side */}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Developer Project
                </p>
                <p className="mt-1 font-semibold text-[#0A2540] truncate">{match.projectName}</p>
                <span className="mt-1.5 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {match.projectType}
                </span>
              </div>

              {/* Center */}
              <div className="flex flex-col items-center gap-1.5 px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A2540]/5">
                  <ArrowLeftRight className="h-5 w-5 text-[#0A2540]" />
                </div>
                <span className="font-mono text-lg font-bold text-[#00A86B]">
                  {match.matchScore}%
                </span>
                <span className="text-xs text-slate-400">match</span>
              </div>

              {/* Financier side */}
              <div className="flex-1 min-w-0 text-right">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Financier
                </p>
                <p className="mt-1 font-semibold text-[#0A2540] truncate">{match.financierName}</p>
                <span className="mt-1.5 inline-block rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                  {match.financierType}
                </span>
              </div>
            </div>

            {/* Footer row */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <MatchStatusBadge status={match.status} />
              <button className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-[#0A2540] transition-colors hover:bg-slate-50">
                View Match
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
