'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Eye,
  Pencil,
  FileText,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';

// ─── Types ────────────────────────────────────────────────────────────────────

type DeltaType = 'positive' | 'negative' | 'warning';

type StatusType =
  | 'in_review'
  | 'active'
  | 'complete'
  | 'failed'
  | 'needs_attention';

// ─── Static Data ──────────────────────────────────────────────────────────────

const kpiCards: {
  title: string;
  value: string;
  delta: string;
  deltaType: DeltaType;
  subLabel: string | null;
  sparkline: number[];
}[] = [
  {
    title: 'Total Disbursed',
    value: '₦47,832,500,000',
    delta: '+₦8.2B this quarter',
    deltaType: 'positive',
    subLabel: null,
    sparkline: [12.1, 15.4, 21.2, 27.8, 34.5, 47.8],
  },
  {
    title: 'Active Projects',
    value: '847',
    delta: '+124 since programme start',
    deltaType: 'positive',
    subLabel: 'across 23 states',
    sparkline: [580, 632, 694, 723, 768, 847],
  },
  {
    title: 'Claims Under Review',
    value: '34',
    delta: 'avg 6.2 days in queue',
    deltaType: 'warning',
    subLabel: '12 require urgent action',
    sparkline: [18, 24, 31, 28, 36, 34],
  },
  {
    title: 'KYC Compliance Rate',
    value: '94.7%',
    delta: '+2.3% vs World Bank target',
    deltaType: 'positive',
    subLabel: 'Target: 92%',
    sparkline: [88.2, 89.5, 91.1, 92.4, 93.6, 94.7],
  },
  {
    title: 'PAYGO Collections (MTD)',
    value: '₦2,847,000,000',
    delta: '-4.2% vs forecast',
    deltaType: 'negative',
    subLabel: 'Forecast: ₦2,971,000,000',
    sparkline: [2.1, 2.4, 2.6, 2.9, 2.8, 2.847],
  },
];

const statusConfig: Record<
  StatusType,
  { label: string; icon: React.ElementType; classes: string }
> = {
  in_review: {
    label: 'In Review',
    icon: Clock,
    classes: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  active: {
    label: 'Active',
    icon: CheckCircle2,
    classes: 'bg-green-50 text-green-700 border border-green-200',
  },
  complete: {
    label: 'Complete',
    icon: CheckCircle2,
    classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
  failed: {
    label: 'Failed',
    icon: XCircle,
    classes: 'bg-red-50 text-red-700 border border-red-200',
  },
  needs_attention: {
    label: 'Needs Attention',
    icon: AlertCircle,
    classes: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
};

interface Project {
  id: string;
  name: string;
  developer: string;
  state: string;
  programType: string;
  status: StatusType;
  disbursementStage: string;
  grantAmount: string;
  lastUpdated: string;
}

const projectData: Project[] = [
  {
    id: 'DARES-MG-2026-0891',
    name: 'Kano North Mini-Grid Cluster',
    developer: 'Novawatt Energy Ltd',
    state: 'Kano',
    programType: 'Mini-grid PBG',
    status: 'active',
    disbursementStage: 'M2 Operations',
    grantAmount: '₦890,000,000',
    lastUpdated: '2026-03-28',
  },
  {
    id: 'DARES-SAS-2026-1204',
    name: 'Lagos Rooftop PBG Phase II',
    developer: 'SolarFlow Nigeria',
    state: 'Lagos',
    programType: 'SAS PBG',
    status: 'in_review',
    disbursementStage: 'Full Application',
    grantAmount: '₦145,000,000',
    lastUpdated: '2026-03-27',
  },
  {
    id: 'DARES-MG-2026-0742',
    name: 'Borno Rural Cluster Phase I',
    developer: 'AfriSolar Power',
    state: 'Borno',
    programType: 'Mini-grid MST',
    status: 'needs_attention',
    disbursementStage: 'Site Assessment',
    grantAmount: '₦620,000,000',
    lastUpdated: '2026-03-20',
  },
  {
    id: 'DARES-MG-2026-0615',
    name: 'Kaduna Rural Electrification',
    developer: 'PowerGen Nigeria',
    state: 'Kaduna',
    programType: 'Mini-grid PBG',
    status: 'complete',
    disbursementStage: 'Completed',
    grantAmount: '₦430,000,000',
    lastUpdated: '2026-03-15',
  },
  {
    id: 'DARES-SAS-2026-0988',
    name: 'Enugu C&I Solar Park',
    developer: 'Greenlight Planet NG',
    state: 'Enugu',
    programType: 'SAS Catalytic',
    status: 'active',
    disbursementStage: 'M1 Construction',
    grantAmount: '₦275,000,000',
    lastUpdated: '2026-03-26',
  },
  {
    id: 'DARES-MG-2026-0534',
    name: 'Niger State Mini-Grid Network',
    developer: 'Rubitec Solar',
    state: 'Niger',
    programType: 'Mini-grid MST',
    status: 'in_review',
    disbursementStage: 'Pre-Qualification',
    grantAmount: '₦780,000,000',
    lastUpdated: '2026-03-29',
  },
  {
    id: 'DARES-SAS-2026-1102',
    name: 'Sokoto Agri-Solar Initiative',
    developer: 'Haske Solar Ltd',
    state: 'Sokoto',
    programType: 'SAS PBG',
    status: 'failed',
    disbursementStage: 'Full Application',
    grantAmount: '₦45,000,000',
    lastUpdated: '2026-03-10',
  },
  {
    id: 'DARES-MG-2026-0876',
    name: 'Ogun Peri-Urban Grid',
    developer: 'Starsight Energy',
    state: 'Ogun',
    programType: 'Mini-grid PBG',
    status: 'active',
    disbursementStage: 'M2 Operations',
    grantAmount: '₦560,000,000',
    lastUpdated: '2026-03-25',
  },
];

const claimsData = [
  {
    id: 'DARES-MG-2026-0891',
    project: 'Kano North Mini-Grid',
    developer: 'Novawatt Energy Ltd',
    amount: '₦42,500,000',
    daysWaiting: 8,
    urgent: false,
  },
  {
    id: 'DARES-SAS-2026-1204',
    project: 'Lagos Rooftop PBG',
    developer: 'SolarFlow Nigeria',
    amount: '₦8,750,000',
    daysWaiting: 5,
    urgent: false,
  },
  {
    id: 'DARES-MG-2026-0876',
    project: 'Borno Rural Cluster',
    developer: 'AfriSolar Power',
    amount: '₦91,200,000',
    daysWaiting: 12,
    urgent: true,
  },
  {
    id: 'DARES-SAS-2026-1189',
    project: 'Enugu C&I Solar',
    developer: 'Greenlight Planet NG',
    amount: '₦15,400,000',
    daysWaiting: 3,
    urgent: false,
  },
];

const disbursementChartData = [
  { month: 'Jul 2025', actual: 8.2, target: 10.0 },
  { month: 'Aug 2025', actual: 12.8, target: 15.0 },
  { month: 'Sep 2025', actual: 18.4, target: 20.5 },
  { month: 'Oct 2025', actual: 24.1, target: 26.0 },
  { month: 'Nov 2025', actual: 31.5, target: 33.0 },
  { month: 'Dec 2025', actual: 36.2, target: 38.5 },
  { month: 'Jan 2026', actual: 39.6, target: 42.0 },
  { month: 'Feb 2026', actual: 43.8, target: 46.0 },
  { month: 'Mar 2026', actual: 47.8, target: 50.0 },
];

const portfolioStageData = [
  { stage: 'Pre-Qualification', minigrid: 42, shs: 38 },
  { stage: 'Full Application', minigrid: 67, shs: 54 },
  { stage: 'Site Assessment', minigrid: 89, shs: 71 },
  { stage: 'M1 Construction', minigrid: 134, shs: 98 },
  { stage: 'M2 Operations', minigrid: 187, shs: 143 },
  { stage: 'Completed', minigrid: 85, shs: 39 },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

function Sparkline({ data, deltaType }: { data: number[]; deltaType: DeltaType }) {
  const chartData = data.map((v, i) => ({ i, v }));
  const strokeColor =
    deltaType === 'positive'
      ? '#00A86B'
      : deltaType === 'negative'
        ? '#ef4444'
        : '#f59e0b';
  return (
    <ResponsiveContainer width="100%" height={36}>
      <LineChart data={chartData}>
        <Line type="monotone" dataKey="v" stroke={strokeColor} strokeWidth={1.5} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status];
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

// ─── Main Component ──────────────────────────────────────────────────────────

export default function DaresDashboardPage() {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedRows.size === projectData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(projectData.map((p) => p.id)));
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Page Header ─────────────────────────────────────────── */}
      <PageHeader
        title="DARES Programme Dashboard"
        description="Nigerian Distributed Access through Renewable Energy Scale-Up"
        action={
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
              Q1 2026 Report Period
            </span>
            <button className="flex items-center gap-2 rounded-lg bg-[#0A2540] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0A2540]/90">
              <FileText className="h-4 w-4" />
              Generate Report
            </button>
          </div>
        }
      />

      {/* ── KPI Cards ───────────────────────────────────────────── */}
      <div className="grid grid-cols-5 gap-4">
        {kpiCards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-xs font-medium text-slate-500">{card.title}</p>
            <p className="mt-2 font-mono text-2xl font-bold tracking-tight text-[#0A2540]">
              {card.value}
            </p>
            <div className="my-2 h-9">
              <Sparkline data={card.sparkline} deltaType={card.deltaType} />
            </div>
            <div className="flex items-center gap-1">
              {card.deltaType === 'positive' && (
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-green-600" />
              )}
              {card.deltaType === 'negative' && (
                <ArrowDownRight className="h-3.5 w-3.5 shrink-0 text-red-600" />
              )}
              <span
                className={`font-mono text-xs font-medium ${
                  card.deltaType === 'positive'
                    ? 'text-green-600'
                    : card.deltaType === 'negative'
                      ? 'text-red-600'
                      : 'text-amber-600'
                }`}
              >
                {card.delta}
              </span>
            </div>
            {card.subLabel && (
              <p className="mt-1 text-xs text-slate-500">{card.subLabel}</p>
            )}
          </div>
        ))}
      </div>

      {/* ── Project Pipeline Table ──────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-[#0A2540]">Project Pipeline</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            All active DARES programme applications
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === projectData.length}
                    onChange={toggleAll}
                    className="h-4 w-4 rounded border-slate-300 accent-[#0A2540]"
                  />
                </th>
                {[
                  'Project Name',
                  'Developer Entity',
                  'State',
                  'Program Type',
                  'Status',
                  'Disbursement Stage',
                  'Grant Amount',
                  'Last Updated',
                  'Actions',
                ].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projectData.map((project, idx) => (
                <tr
                  key={project.id}
                  className={`transition-colors hover:bg-slate-50 ${
                    idx !== projectData.length - 1 ? 'border-b border-slate-50' : ''
                  } ${selectedRows.has(project.id) ? 'bg-blue-50/50' : ''}`}
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={selectedRows.has(project.id)}
                      onChange={() => toggleRow(project.id)}
                      className="h-4 w-4 rounded border-slate-300 accent-[#0A2540]"
                    />
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-medium text-[#0A2540]">{project.name}</p>
                    <p className="font-mono text-xs text-slate-400">{project.id}</p>
                  </td>
                  <td className="px-4 py-3.5 text-slate-700">{project.developer}</td>
                  <td className="px-4 py-3.5">
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {project.state}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">{project.programType}</td>
                  <td className="px-4 py-3.5">
                    <StatusBadge status={project.status} />
                  </td>
                  <td className="px-4 py-3.5 text-xs text-slate-600">
                    {project.disbursementStage}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-sm font-semibold text-[#0A2540]">
                      {project.grantAmount}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500">
                    {project.lastUpdated}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1">
                      <button className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100">
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                      <button className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100">
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bulk Action Bar */}
        {selectedRows.size > 0 && (
          <div className="flex items-center justify-between border-t border-slate-200 bg-[#0A2540]/5 px-6 py-3">
            <p className="text-sm font-medium text-[#0A2540]">
              <span className="font-mono">{selectedRows.size}</span>{' '}
              project{selectedRows.size !== 1 ? 's' : ''} selected
            </p>
            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50">
                Mark for Review
              </button>
              <button className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50">
                <Download className="h-3.5 w-3.5" />
                Export
              </button>
              <button className="flex items-center gap-1 rounded-lg bg-[#0A2540] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0A2540]/90">
                <FileText className="h-3.5 w-3.5" />
                Generate WB Report
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Claims Requiring Action ─────────────────────────────── */}
      <div className="rounded-xl border border-amber-200 bg-amber-50/30 shadow-sm">
        <div className="flex items-center gap-2 border-b border-amber-200 px-6 py-4">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <h2 className="text-base font-semibold text-amber-900">Requires Your Attention</h2>
          <span className="ml-auto rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-amber-700">
            4 pending
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-amber-100">
                {['Claim ID', 'Project', 'Developer', 'Claimed Amount', 'Days Waiting', 'Action'].map(
                  (col) => (
                    <th
                      key={col}
                      className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-amber-700"
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {claimsData.map((claim, idx) => (
                <tr
                  key={claim.id}
                  className={`transition-colors hover:bg-amber-50/50 ${
                    idx !== claimsData.length - 1 ? 'border-b border-amber-50' : ''
                  }`}
                >
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-xs font-medium text-[#0A2540]">{claim.id}</span>
                  </td>
                  <td className="px-6 py-3.5 font-medium text-[#0A2540]">{claim.project}</td>
                  <td className="px-6 py-3.5 text-slate-600">{claim.developer}</td>
                  <td className="px-6 py-3.5">
                    <span className="font-mono text-sm font-semibold text-[#0A2540]">
                      {claim.amount}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1 font-mono text-sm font-semibold ${
                        claim.urgent ? 'text-red-600' : 'text-amber-700'
                      }`}
                    >
                      {claim.urgent && <AlertCircle className="h-3.5 w-3.5" />}
                      {claim.daysWaiting} days
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <button className="flex items-center gap-1.5 rounded-lg bg-[#0A2540] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0A2540]/90">
                      Review Claim
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Charts Row ──────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-6">
        {/* Cumulative Disbursements Area Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-[#0A2540]">
              Cumulative Disbursements vs Programme Target
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">Jul 2025 – Mar 2026 · ₦ Billions</p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={disbursementChartData}
              margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0A2540" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#0A2540" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00A86B" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="#00A86B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'var(--font-ibm-plex-mono)' }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'var(--font-ibm-plex-mono)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v: number) => `₦${v}B`}
              />
              <Tooltip
                formatter={(value: number, name: string) => [
                  `₦${value}B`,
                  name === 'actual' ? 'Actual Disbursements' : 'Programme Target',
                ]}
                contentStyle={{
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: 'var(--font-ibm-plex-mono)',
                }}
                labelStyle={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
              />
              <Legend
                formatter={(value: string) =>
                  value === 'actual' ? 'Actual Disbursements' : 'Programme Target'
                }
                wrapperStyle={{ fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#0A2540"
                strokeWidth={2}
                fill="url(#actualGradient)"
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#00A86B"
                strokeWidth={2}
                strokeDasharray="5 4"
                fill="url(#targetGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Portfolio by Stage Bar Chart */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-base font-semibold text-[#0A2540]">
              Portfolio by Programme Stage
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Project count by milestone · All programmes
            </p>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={portfolioStageData}
              margin={{ top: 4, right: 8, left: 0, bottom: 28 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis
                dataKey="stage"
                tick={{ fontSize: 10, fill: '#64748B' }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickLine={false}
                angle={-20}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#64748B', fontFamily: 'var(--font-ibm-plex-mono)' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: 'var(--font-ibm-plex-mono)',
                }}
              />
              <Legend
                formatter={(value: string) => (value === 'minigrid' ? 'Mini-grid' : 'SHS/SAS')}
                wrapperStyle={{ fontSize: 12 }}
              />
              <Bar dataKey="minigrid" fill="#0A2540" radius={[3, 3, 0, 0]} maxBarSize={24} />
              <Bar dataKey="shs" fill="#00A86B" radius={[3, 3, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
