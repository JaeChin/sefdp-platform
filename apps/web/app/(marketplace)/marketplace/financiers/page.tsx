import { MapPin, Eye, GitCompare } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@sefdp/ui';

// ─── Types ────────────────────────────────────────────────────────────────────

type FinancierType = 'DFI' | 'Commercial Bank' | 'Impact Fund';
type Instrument = 'Equity' | 'Debt' | 'Grant' | 'Mezzanine';

interface Financier {
  id: string;
  name: string;
  type: FinancierType;
  location: string;
  focusTags: string[];
  dealSizeRange: string;
  instruments: Instrument[];
  activeMatches: number;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const financiers: Financier[] = [
  {
    id: 'FIN-001',
    name: 'British International Investment (BII)',
    type: 'DFI',
    location: 'London, UK',
    focusTags: ['Mini-grid', 'C&I'],
    dealSizeRange: '$500k–$10M',
    instruments: ['Equity', 'Debt'],
    activeMatches: 3,
  },
  {
    id: 'FIN-002',
    name: 'Stanbic IBTC',
    type: 'Commercial Bank',
    location: 'Lagos, Nigeria',
    focusTags: ['Mini-grid', 'C&I', 'SHS', 'Hybrid'],
    dealSizeRange: '$200k–$5M',
    instruments: ['Debt'],
    activeMatches: 5,
  },
  {
    id: 'FIN-003',
    name: 'CrossBoundary Energy Access',
    type: 'Impact Fund',
    location: 'Nairobi, Kenya',
    focusTags: ['Mini-grid', 'SHS'],
    dealSizeRange: '$100k–$2M',
    instruments: ['Equity', 'Mezzanine'],
    activeMatches: 7,
  },
  {
    id: 'FIN-004',
    name: 'Africa Finance Corporation (AFC)',
    type: 'DFI',
    location: 'Lagos, Nigeria',
    focusTags: ['C&I', 'Hybrid'],
    dealSizeRange: '$1M–$50M',
    instruments: ['Debt', 'Equity'],
    activeMatches: 2,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const typeConfig: Record<FinancierType, { classes: string }> = {
  DFI: { classes: 'bg-[#0A2540]/10 text-[#0A2540] border border-[#0A2540]/20' },
  'Commercial Bank': { classes: 'bg-blue-50 text-blue-700 border border-blue-200' },
  'Impact Fund': { classes: 'bg-green-50 text-[#00A86B] border border-green-200' },
};

const instrumentConfig: Record<Instrument, string> = {
  Equity: 'bg-violet-50 text-violet-700 border border-violet-200',
  Debt: 'bg-blue-50 text-blue-700 border border-blue-200',
  Grant: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Mezzanine: 'bg-amber-50 text-amber-700 border border-amber-200',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function FinanciersPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Financiers"
        description="Browse DFIs, commercial banks, and impact funds actively seeking Nigerian energy investments."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {financiers.map((fin) => {
          const typeStyle = typeConfig[fin.type];

          return (
            <article
              key={fin.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold text-[#0A2540]">{fin.name}</h3>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeStyle.classes}`}
                    >
                      {fin.type}
                    </span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {fin.location}
              </div>

              {/* Investment Focus */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-slate-500">Investment Focus</p>
                <div className="flex flex-wrap gap-1.5">
                  {fin.focusTags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deal Size */}
              <div className="mb-4 flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-4 py-2.5">
                <span className="text-xs text-slate-500">Deal Size Range</span>
                <span className="font-mono text-sm font-bold text-[#0A2540]">
                  {fin.dealSizeRange}
                </span>
              </div>

              {/* Instruments */}
              <div className="mb-4">
                <p className="mb-2 text-xs font-medium text-slate-500">Preferred Instruments</p>
                <div className="flex flex-wrap gap-1.5">
                  {fin.instruments.map((inst) => (
                    <span
                      key={inst}
                      className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${instrumentConfig[inst]}`}
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Matches */}
              <div className="mb-5 flex items-center gap-2">
                <GitCompare className="h-4 w-4 text-[#00A86B]" aria-hidden="true" />
                <span className="text-sm text-slate-600">
                  <span className="font-mono font-bold text-[#0A2540]">{fin.activeMatches}</span>
                  {' '}active match{fin.activeMatches !== 1 ? 'es' : ''}
                </span>
              </div>

              {/* Action */}
              <div className="mt-auto">
                <Button
                  variant="default"
                  size="sm"
                  className="w-full bg-[#0A2540] text-white hover:bg-[#0A2540]/90"
                >
                  <Eye className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                  View Criteria
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
