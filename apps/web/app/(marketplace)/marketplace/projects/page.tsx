'use client';

import { useState } from 'react';
import { CheckCircle2, Eye, Handshake, Clock, MessageSquare, Layers, X, ChevronDown } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@sefdp/ui';

const CBN_RATE = 1_580; // NGN per USD — CBN official rate, update as needed

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
  capitalNeededNGN: number;
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
    capitalNeededNGN: 1_200_000 * CBN_RATE,
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
    capitalNeededNGN: 3_400_000 * CBN_RATE,
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
    capitalNeededNGN: 890_000 * CBN_RATE,
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
    capitalNeededNGN: 5_100_000 * CBN_RATE,
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
    capitalNeededNGN: 420_000 * CBN_RATE,
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
    capitalNeededNGN: 2_200_000 * CBN_RATE,
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
  { label: 'Under ₦790M', value: 'under_500k' },
  { label: '₦790M–₦3.16B', value: '500k_2m' },
  { label: 'Over ₦3.16B', value: 'over_2m' },
];

const statusOptions: { label: string; value: ProjectStatus | 'all' }[] = [
  { label: 'All Statuses', value: 'all' },
  { label: 'Seeking Financing', value: 'seeking_financing' },
  { label: 'In Discussion', value: 'in_discussion' },
  { label: 'Funded', value: 'funded' },
];

// ─── Aggregation Data ─────────────────────────────────────────────────────────

interface AggregationProject {
  id: string;
  name: string;
  developer: string;
  capacityKwp: number;
  valueNgnM: number; // value in millions of Naira
}

const ANCHOR_PROJECT: AggregationProject = {
  id: 'PRJ-2605',
  name: 'Niger State SHS Programme',
  developer: 'Rubitec Solar',
  capacityKwp: 180,
  valueNgnM: 420,
};

const AGGREGATION_CANDIDATES: AggregationProject[] = [
  { id: 'AGG-01', name: 'Kaduna Rural Electrification Phase I', developer: 'Nayo Tropical Technology', capacityKwp: 210, valueNgnM: 390 },
  { id: 'AGG-02', name: 'Plateau State Mini-Grid Cluster', developer: 'Arnergy Solar', capacityKwp: 340, valueNgnM: 520 },
  { id: 'AGG-03', name: 'Kogi C&I Rooftop Portfolio', developer: 'Auxano Solar Nigeria', capacityKwp: 160, valueNgnM: 310 },
  { id: 'AGG-04', name: 'Cross River SHS Expansion', developer: 'Rensource Distributed Energy', capacityKwp: 95, valueNgnM: 185 },
  { id: 'AGG-05', name: 'Sokoto Rural Solar Initiative', developer: 'Havenhill Synergy', capacityKwp: 280, valueNgnM: 460 },
  { id: 'AGG-06', name: 'Anambra Hybrid Grid Programme', developer: 'BlueCamel Energy', capacityKwp: 190, valueNgnM: 370 },
];

const DFI_THRESHOLD_NGN_M = 500;

// ─── Aggregation Modal ────────────────────────────────────────────────────────

function AggregationModal({ onClose }: { onClose: () => void }) {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>('');

  const selectedCandidate = AGGREGATION_CANDIDATES.find((p) => p.id === selectedCandidateId) ?? null;

  const combinedCapacityKwp = selectedCandidate
    ? ANCHOR_PROJECT.capacityKwp + selectedCandidate.capacityKwp
    : ANCHOR_PROJECT.capacityKwp;

  const combinedValueNgnM = selectedCandidate
    ? ANCHOR_PROJECT.valueNgnM + selectedCandidate.valueNgnM
    : ANCHOR_PROJECT.valueNgnM;

  const meetsThreshold = combinedValueNgnM >= DFI_THRESHOLD_NGN_M;
  const additionalFinanciers = meetsThreshold ? 3 : 0;

  return (
    /* Overlay */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aggregation-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal Card */}
      <div className="relative w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A2540]">
              <Layers className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <h2 id="aggregation-modal-title" className="font-display text-lg font-bold text-[#0A2540]">
              Project Aggregation
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">

          {/* Subtitle */}
          <p className="text-sm text-slate-600">
            Combine smaller projects to meet minimum deal sizes
          </p>

          {/* Selected for aggregation */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Selected for aggregation
            </p>
            <div className="space-y-2">
              {/* Anchor project — fixed */}
              <div className="flex items-center gap-3 rounded-lg border border-[#00A86B]/30 bg-green-50 px-4 py-3">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#00A86B]" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0A2540] truncate">{ANCHOR_PROJECT.name}</p>
                  <p className="text-xs text-slate-500">{ANCHOR_PROJECT.developer}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-mono text-sm font-bold text-[#0A2540]">₦{ANCHOR_PROJECT.valueNgnM}M</p>
                  <p className="font-mono text-xs text-slate-400">{ANCHOR_PROJECT.capacityKwp} kWp</p>
                </div>
              </div>

              {/* Second project selector */}
              {selectedCandidate ? (
                <div className="flex items-center gap-3 rounded-lg border border-[#00A86B]/30 bg-green-50 px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#00A86B]" aria-hidden="true" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#0A2540] truncate">{selectedCandidate.name}</p>
                    <p className="text-xs text-slate-500">{selectedCandidate.developer}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-mono text-sm font-bold text-[#0A2540]">₦{selectedCandidate.valueNgnM}M</p>
                    <p className="font-mono text-xs text-slate-400">{selectedCandidate.capacityKwp} kWp</p>
                  </div>
                  <button
                    onClick={() => setSelectedCandidateId('')}
                    aria-label="Remove project"
                    className="ml-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded text-slate-400 hover:bg-white hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <select
                    value={selectedCandidateId}
                    onChange={(e) => setSelectedCandidateId(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-3 pr-10 text-sm text-slate-500 focus:border-[#00A86B] focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20"
                    aria-label="Add another project to aggregate"
                  >
                    <option value="">Add another project...</option>
                    {AGGREGATION_CANDIDATES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — ₦{p.valueNgnM}M
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>

          {/* Combined Stats */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Combined capacity</span>
              <span className="font-mono text-sm font-semibold text-[#0A2540]">
                {combinedCapacityKwp.toLocaleString()} kWp
                {!selectedCandidate && (
                  <span className="ml-2 text-xs font-normal text-slate-400">→ Select second project to combine</span>
                )}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Combined value</span>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-sm font-bold ${meetsThreshold && selectedCandidate ? 'text-[#00A86B]' : 'text-[#0A2540]'}`}>
                  ₦{combinedValueNgnM.toLocaleString()}M
                </span>
                {!selectedCandidate && (
                  <span className="text-xs text-slate-400">minimum ₦{DFI_THRESHOLD_NGN_M}M for most DFI mandates</span>
                )}
                {selectedCandidate && meetsThreshold && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-[#00A86B]">
                    <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                    Meets DFI threshold
                  </span>
                )}
                {selectedCandidate && !meetsThreshold && (
                  <span className="text-xs text-amber-600">
                    ₦{DFI_THRESHOLD_NGN_M - combinedValueNgnM}M below threshold
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Why aggregate callout */}
          <div className="rounded-lg border border-[#0A2540]/10 bg-[#0A2540]/5 px-4 py-3 space-y-1.5">
            <p className="text-xs font-semibold text-[#0A2540]">Why aggregate?</p>
            <p className="text-xs text-slate-600">
              Africa Finance Corporation requires minimum ₦500M deals.
            </p>
            {additionalFinanciers > 0 ? (
              <p className="text-xs font-medium text-[#00A86B]">
                Combining two ₦400M+ projects unlocks access to {additionalFinanciers} additional financiers.
              </p>
            ) : (
              <p className="text-xs text-slate-500">
                Combining two ₦400M+ projects unlocks access to 3 additional financiers.
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="sm"
            disabled={!selectedCandidate}
            className="bg-[#00A86B] text-white hover:bg-[#00A86B]/90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Layers className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            Submit Combined Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketplaceProjectsPage() {
  const [selectedState, setSelectedState] = useState<string>('All States');
  const [selectedType, setSelectedType] = useState<TypeFilterKey>('all');
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedCapital, setSelectedCapital] = useState<CapitalBucket | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | 'all'>('all');
  const [showAggregationModal, setShowAggregationModal] = useState(false);
  const [view, setView] = useState<"cards" | "table">("cards");

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
      {showAggregationModal && (
        <AggregationModal onClose={() => setShowAggregationModal(false)} />
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Projects"
          description="Browse IFC-screened energy projects seeking financing. All projects are credit-scored and pre-verified."
        />
        <div className="flex flex-shrink-0 items-center gap-2 pt-1">
          <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-1">
            <button
              onClick={() => setView("cards")}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                view === "cards" ? "bg-[#0A2540] text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Cards
            </button>
            <button
              onClick={() => setView("table")}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                view === "table" ? "bg-[#0A2540] text-white" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Ranked Table
            </button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            List Project
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowAggregationModal(true)}
            className="bg-[#0A2540] text-white hover:bg-[#0A2540]/90"
          >
            <Layers className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            Aggregate Projects
          </Button>
        </div>
      </div>

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

      {/* Project Grid / Table */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <p className="text-sm text-slate-500">No projects match the selected filters.</p>
        </div>
      ) : view === "table" ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 w-12">Rank</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Project</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Developer</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Type</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">State</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">IFC Score</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Capital Needed</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[...filtered].sort((a, b) => b.ifcScore - a.ifcScore).map((project, index) => {
                const scoreColor =
                  project.ifcScore >= 80 ? '#00A86B' : project.ifcScore >= 65 ? '#D97706' : '#DC2626';
                const status = statusConfig[project.status];
                const StatusIcon = status.icon;
                return (
                  <tr key={project.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 text-xs font-mono text-slate-400">#{index + 1}</td>
                    <td className="py-3 font-display text-sm font-semibold text-[#0A2540]">{project.name}</td>
                    <td className="py-3 text-sm text-slate-600">{project.developer}</td>
                    <td className="py-3">
                      <span className="rounded-full border border-[#0A2540]/20 bg-[#0A2540]/5 px-2.5 py-0.5 text-xs font-medium text-[#0A2540]">
                        {project.typeLabel}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-slate-600">{project.state}</td>
                    <td className="py-3">
                      <span className="font-mono text-sm font-bold" style={{ color: scoreColor }}>
                        {project.ifcScore}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-sm text-[#0A2540]">
                      ₦{project.capitalNeededNGN.toLocaleString('en-NG')}
                    </td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${status.classes}`}>
                        <StatusIcon className="h-3 w-3" aria-hidden="true" />
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                      ₦{project.capitalNeededNGN.toLocaleString('en-NG')}
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
