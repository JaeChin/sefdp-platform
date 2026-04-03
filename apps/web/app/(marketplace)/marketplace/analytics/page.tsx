'use client';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { PageHeader } from '@/components/shared/page-header';

// ─── Chart Data ──────────────────────────────────────────────────────────────

const matchVolumeData = [
  { month: 'Oct', matches: 4, closed: 1 },
  { month: 'Nov', matches: 6, closed: 2 },
  { month: 'Dec', matches: 8, closed: 3 },
  { month: 'Jan', matches: 11, closed: 4 },
  { month: 'Feb', matches: 18, closed: 6 },
  { month: 'Mar', matches: 25, closed: 8 },
  { month: 'Apr', matches: 31, closed: 10 },
];

const projectTypeData = [
  { type: 'Mini-grid', count: 14 },
  { type: 'C&I Solar', count: 8 },
  { type: 'SHS', count: 6 },
  { type: 'Hybrid', count: 3 },
];

const topFinanciers = [
  { name: 'CrossBoundary Energy Access', value: 1_840_000_000, display: '₦1.84B' },
  { name: 'British International Investment', value: 1_470_000_000, display: '₦1.47B' },
  { name: 'Africa Finance Corporation', value: 630_000_000, display: '₦630M' },
  { name: 'Stanbic IBTC', value: 252_000_000, display: '₦252M' },
];

const maxFinancierValue = topFinanciers[0]?.value ?? 1;

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MarketplaceAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Marketplace performance metrics, match trends, and capital mobilisation tracking."
      />

      {/* Section 1 — KPI stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Match Volume', value: '31', sub: 'total matches to date' },
          { label: 'Deal Value', value: '₦4.2B', sub: 'capital in discussion' },
          { label: 'Avg IFC Score', value: '76', sub: 'across listed projects', suffix: '/100' },
          { label: 'Active Developers', value: '18', sub: 'with listed projects' },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-1">
              {card.label}
            </p>
            <p
              className="text-2xl font-bold text-slate-900"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {card.value}
              {card.suffix && (
                <span className="text-sm font-normal text-slate-400">{card.suffix}</span>
              )}
            </p>
            <p className="text-xs text-slate-500 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Section 2 — Match volume over time */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700 mb-1">Match Volume Over Time</h2>
        <p className="text-xs text-slate-500 mb-4">Cumulative matches and closed deals (Oct 2025 – Apr 2026)</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={matchVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              />
              <Area
                type="monotone"
                dataKey="matches"
                name="Matches Made"
                stroke="#00A86B"
                strokeWidth={2}
                fill="#00A86B"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="closed"
                name="Deals Closed"
                stroke="#0A2540"
                strokeWidth={2}
                fill="#0A2540"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-5 mt-3">
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-3 h-0.5 bg-[#00A86B] rounded" />Matches Made
          </span>
          <span className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="w-3 h-0.5 bg-[#0A2540] rounded" />Deals Closed
          </span>
        </div>
      </div>

      {/* Bottom row: two columns */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* Section 3 — Project type distribution */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700 mb-1">Projects by Type</h2>
          <p className="text-xs text-slate-500 mb-4">Distribution of listed projects</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={projectTypeData} layout="vertical" barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                <XAxis
                  type="number"
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="type"
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" name="Projects" fill="#00A86B" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Section 4 — Top financiers */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700 mb-1">Top Financiers by Deal Value</h2>
          <p className="text-xs text-slate-500 mb-4">Ranked by total capital committed</p>
          <div className="space-y-4">
            {topFinanciers.map((f, i) => (
              <div key={f.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-700">
                    <span className="text-xs text-slate-400 mr-2">{i + 1}.</span>
                    {f.name}
                  </span>
                  <span
                    className="text-sm font-semibold text-slate-900"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {f.display}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#00A86B]"
                    style={{ width: `${(f.value / maxFinancierValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
