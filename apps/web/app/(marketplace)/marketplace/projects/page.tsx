'use client';

import { useState } from 'react';
import { CheckCircle2, Eye, Handshake, Clock, MessageSquare } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@sefdp/ui';

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectType = 'mini_grid' | 'shs' | 'c_and_i' | 'hybrid';
type ProjectStatus = 'seeking_financing' | 'in_discussion' | 'funded';
type CapitalBucket = 'under_500k' | '500k_2m' | 'over_2m';

interface Project {
  id: string;
  name: string;
  developer: string;
  verified: boolean;
  state: string;
  type: ProjectType;
  typeLabel: string;
  ifcScore: number;
  capitalNeededUsd: string;
  capitalBucket: CapitalBucket;
  capacityKwp: number;
  status: ProjectStatus;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: 'PRJ-2601',
    name: 'Kano North Mini-Grid Expansion',
    developer: 'Novawatt Energy Ltd',
    verified: true,
    state: 'Kano',
    type: 'mini_grid',
    typeLabel: 'Mini-grid',
    ifcScore: 74,
    capitalNeededUsd: '$1,200,000',
    capitalBucket: '500k_2m',
    capacityKwp: 850,
    status: 'seeking_financing',
  },
  {
    id: 'PRJ-2602',
    name: 'Lagos Island C&I Solar Portfolio',
    developer: 'SolarFlow Nigeria',
    verified: false,
    state: 'Lagos',
    type: 'c_and_i',
    typeLabel: 'C&I',
    ifcScore: 68,
    capitalNeededUsd: '$3,400,000',
    capitalBucket: 'over_2m',
    capacityKwp: 2100,
    status: 'in_discussion',
  },
  {
    id: 'PRJ-2603',
    name: 'Borno Rural Cluster Phase II',
    developer: 'AfriSolar Power',
    verified: true,
    state: 'Borno',
    type: 'mini_grid',
    typeLabel: 'Mini-grid',
    ifcScore: 71,
    capitalNeededUsd: '$890,000',
    capitalBucket: '500k_2m',
    capacityKwp: 620,
    status: 'seeking_financing',
  },
  {
    id: 'PRJ-2604',
    name: 'Enugu Industrial Solar Park',
    developer: 'Greenlight Planet NG',
    verified: true,
    state: 'Enugu',
    type: 'c_and_i',
    typeLabel: 'C&I',
    ifcScore: 82,
    capitalNeededUsd: '$5,100,000',
    capitalBucket: 'over_2m',
    capacityKwp: 3400,
    status: 'seeking_financing',
  },
  {
    id: 'PRJ-2605',
    name: 'Niger State SHS Programme',
    developer: 'Rubitec Solar',
    verified: false,
    state: 'Niger',
    type: 'shs',
    typeLabel: 'SHS',
    ifcScore: 61,
    capitalNeededUsd: '$420,000',
    capitalBucket: 'under_500k',
    capacityKwp: 180,
    status: 'seeking_financing',
  },
  {
    id: 'PRJ-2606',
    name: 'Ogun Peri-Urban Grid',
    developer: 'Starsight Energy',
    verified: true,
    state: 'Ogun',
    type: 'hybrid',
    typeLabel: 'Hybrid',
    ifcScore: 77,
    capitalNeededUsd: '$2,200,000',
    capitalBucket: '500k_2m',
    capacityKwp: 1450,
    status: 'in_discussion',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreStyle(score: number): { text: string; bg: string; border: string } {
  if (score >= 80) return { text: 'text-[#00A86B]', bg: 'bg-green-50', border: 'border-green-200' };
  if (score >= 65) return { text: 'text-[#F59E0B]', bg: 'bg-amber-50', border: 'border-amber-200' };
  return { text: 'text-[#DC2626]', bg: 'bg-red-50', border: 'border-red-200' };
}

const statusConfig: Record<
  ProjectStatus,
  { label: string; icon: React.ElementType; classes: string }
> = {
  seeking_financing: {
    label: 'Seeking Financing',
    icon: Clock,
    classes: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  in_discussion: {
    label: 'In Discussion',
    icon: MessageSquare,
    classes: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
  funded: {
    label: 'Funded',
    icon: CheckCircle2,
    classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
};

type TypeFilterKey = ProjectType | 'all';

const typeToggleOptions: { key: TypeFilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'mini_grid', label: 'Mini-grid' },
  { key: 'shs', label: 'SHS' },
  { key: 'c_and_i', label: 'C&I' },
  { key: 'hybrid', label: 'Hybrid' },
];

const stateOptions = ['All States', 'Borno', 'Enugu', 'Kano', 'Lagos', 'Niger', 'Ogun'];

const capitalOptions: { label: string; value: CapitalBucket | 'all' }[] = [
  { label: 'All Sizes', value: 'all' },
  { label: 'Under $500k', value: 'under_500k' },
  { label: '$500k–$2M', value: '500k_2m' },
  { label: 'Over $2M', value: 'over_2m' },
];

const statusOptions: { label: string; value: ProjectStatus | 'all' }[] = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Seeking Financing', value: 'seeking_financing' },
  { label: 'In Discussion', value: 'in_discussion' },
  { label: 'Funded', value: 'funded' },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketplaceProjectsPage() {
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [selectedType, setSelectedType] = useState<TypeFilterKey>('all');
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedCapital, setSelectedCapital] = useState<CapitalBucket | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');

  const filtered = projects.filter((p) => {
    if (selectedState !== 'All States' && p.state !== selectedState) return false;
    if (selectedType !== 'all' && p.type !== selectedType) return false;
    if (p.ifcScore < minScore) return false;
    if (selectedCapital !== 'all' && p.capitalBucket !== selectedCapital) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="Browse IFC-screened energy projects seeking financing. All projects are credit-scored and pre-verified."
      />

      {/* Filter Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-end gap-4">
          {/* State */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500" htmlFor="state-filter">
              State
            </label>
            <select
              id="state-filter"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
            >
              {stateOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Project Type toggle */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-500">Project Type</span>
            <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5" role="group" aria-label="Filter by project type">
              {typeToggleOptions.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setSelectedType(key)}
                  aria-pressed={selectedType === key}
                  className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                    selectedType === key
                      ? 'bg-[#0A2540] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#0A2540]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* IFC Score slider */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500" htmlFor="score-filter">
              Min IFC Score:{' '}
              <span className="font-mono font-semibold text-[#0A2540]">{minScore}</span>
            </label>
            <input
              id="score-filter"
              type="range"
              min={0}
              max={100}
              step={5}
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="w-36 accent-[#00A86B]"
            />
          </div>

          {/* Capital Need */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500" htmlFor="capital-filter">
              Capital Need
            </label>
            <select
              id="capital-filter"
              value={selectedCapital}
              onChange={(e) => setSelectedCapital(e.target.value as CapitalBucket | 'all')}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
            >
              {capitalOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-500" htmlFor="status-filter">
              Status
            </label>
            <select
              id="status-filter"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as ProjectStatus | 'all')}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0A2540] focus:outline-none focus:ring-2 focus:ring-[#00A86B]"
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <p className="ml-auto self-end text-sm text-slate-500">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Project Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-slate-500">No projects match the selected filters.</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const scoreStyle = getScoreStyle(project.ifcScore);
            const status = statusConfig[project.status];
            const StatusIcon = status.icon;

            return (
              <article
                key={project.id}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Project Name + Developer */}
                <div className="mb-3">
                  <h3 className="font-display text-sm font-bold leading-snug text-[#0A2540]">
                    {project.name}
                  </h3>
                  <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-slate-500">{project.developer}</span>
                    {project.verified && (
                      <span className="inline-flex items-center gap-0.5 rounded-full border border-green-200 bg-green-50 px-1.5 py-0.5 text-xs font-medium text-[#00A86B]">
                        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                {/* State + Type badges */}
                <div className="mb-4 flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                    {project.state}
                  </span>
                  <span className="rounded-full border border-[#0A2540]/20 bg-[#0A2540]/5 px-2.5 py-0.5 text-xs font-medium text-[#0A2540]">
                    {project.typeLabel}
                  </span>
                </div>

                {/* IFC Score */}
                <div
                  className={`mb-4 flex items-center justify-between rounded-lg border px-3 py-2.5 ${scoreStyle.bg} ${scoreStyle.border}`}
                >
                  <span className="text-xs font-medium text-slate-600">IFC Score</span>
                  <span className={`font-mono text-2xl font-bold leading-none ${scoreStyle.text}`}>
                    {project.ifcScore}
                    <span className="text-xs font-normal opacity-60">/100</span>
                  </span>
                </div>

                {/* Key Metrics */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-500">Capital Needed</p>
                    <p className="font-mono text-sm font-semibold text-[#0A2540]">
                      {project.capitalNeededUsd}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Capacity</p>
                    <p className="font-mono text-sm font-semibold text-[#0A2540]">
                      {project.capacityKwp.toLocaleString()} kWp
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.classes}`}
                  >
                    <StatusIcon className="h-3 w-3" aria-hidden="true" />
                    {status.label}
                  </span>
                </div>

                {/* Actions */}
                <div className="mt-auto flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 bg-[#0A2540] text-white hover:bg-[#0A2540]/90"
                  >
                    <Eye className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    View Project
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[#00A86B] text-[#00A86B] hover:bg-[#00A86B]/5 hover:text-[#00A86B]"
                  >
                    <Handshake className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    Express Interest
                  </Button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
