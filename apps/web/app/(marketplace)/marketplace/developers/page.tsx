'use client';

import { useState } from 'react';
import { CheckCircle2, Eye, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';
import type { Route } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@sefdp/ui';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Developer {
  id: string;
  name: string;
  verified: boolean;
  location: string;
  ifcScore: number;
  totalProjects: number;
  totalConnections: number;
  capacityMw: number;
  yearsOperating: number;
  projectTypes: string[];
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const developers: Developer[] = [
  {
    id: 'DEV-001',
    name: 'SOLAD',
    verified: true,
    location: 'Lagos, Nigeria',
    ifcScore: 74,
    totalProjects: 12,
    totalConnections: 8400,
    capacityMw: 4.2,
    yearsOperating: 7,
    projectTypes: ['Mini-grid', 'PBG'],
  },
  {
    id: 'DEV-002',
    name: 'RIPLE',
    verified: true,
    location: 'Abuja, Nigeria',
    ifcScore: 71,
    totalProjects: 8,
    totalConnections: 5200,
    capacityMw: 2.8,
    yearsOperating: 5,
    projectTypes: ['Mini-grid', 'MST'],
  },
  {
    id: 'DEV-003',
    name: 'Solar For Business',
    verified: true,
    location: 'Lagos, Nigeria',
    ifcScore: 82,
    totalProjects: 18,
    totalConnections: 14000,
    capacityMw: 8.6,
    yearsOperating: 9,
    projectTypes: ['C&I', 'SHS'],
  },
  {
    id: 'DEV-004',
    name: 'Python Renewable Energy',
    verified: false,
    location: 'Lagos, Nigeria',
    ifcScore: 68,
    totalProjects: 6,
    totalConnections: 3100,
    capacityMw: 1.9,
    yearsOperating: 4,
    projectTypes: ['SHS', 'PBG'],
  },
  {
    id: 'DEV-005',
    name: 'Ruth London Energy',
    verified: true,
    location: 'Lagos, Nigeria',
    ifcScore: 77,
    totalProjects: 22,
    totalConnections: 18500,
    capacityMw: 11.2,
    yearsOperating: 11,
    projectTypes: ['C&I', 'Hybrid'],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreStyle(): { text: string; bg: string; border: string } {
  return { text: 'text-[#00A86B]', bg: 'bg-green-50', border: 'border-green-200' };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DevelopersPage() {
  const [view, setView] = useState<"cards" | "table">("cards");

  const sortedDevelopers = [...developers].sort((a, b) => b.ifcScore - a.ifcScore);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <PageHeader
          title="Developers"
          description="Browse verified developer profiles with ratings and audited track records."
        />
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
      </div>

      {view === "table" ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400 w-12">Rank</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Developer</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Rating</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Track Record</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Verified</th>
                <th className="pb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Projects Listed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedDevelopers.map((dev, index) => {
                const scoreColor = '#00A86B';
                return (
                  <tr key={dev.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 text-xs font-mono text-slate-400">#{index + 1}</td>
                    <td className="py-3 font-display text-sm font-semibold text-[#0A2540]">{dev.name}</td>
                    <td className="py-3">
                      <span className="font-mono text-sm font-bold" style={{ color: scoreColor }}>
                        {dev.ifcScore}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-sm text-slate-600">
                      {dev.yearsOperating ? `${dev.yearsOperating} yrs` : '—'}
                    </td>
                    <td className="py-3">
                      {dev.verified ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-[#00A86B]">
                          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-medium text-slate-400">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-mono text-sm text-[#0A2540]">{dev.totalProjects}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {developers.map((dev) => {
          const scoreStyle = getScoreStyle();
          const trackBarWidth = Math.min((dev.yearsOperating / 15) * 100, 100);

          return (
            <article
              key={dev.id}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-sm font-bold text-[#0A2540]">{dev.name}</h3>
                  {dev.verified && (
                    <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-[#00A86B]">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Verified Developer
                    </span>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {dev.location}
              </div>

              {/* Rating */}
              <div
                className={`mb-4 flex items-center justify-between rounded-lg border px-3 py-2.5 ${scoreStyle.bg} ${scoreStyle.border}`}
              >
                <span className="text-xs font-medium text-slate-600">Rating</span>
                <span className={`font-mono text-2xl font-bold leading-none ${scoreStyle.text}`}>
                  {dev.ifcScore}
                  <span className="text-xs font-normal opacity-60">/100</span>
                </span>
              </div>

              {/* Key Stats */}
              <div className="mb-4 grid grid-cols-3 divide-x divide-slate-100 rounded-lg border border-slate-100 bg-slate-50">
                <div className="px-3 py-2 text-center">
                  <p className="font-mono text-base font-bold text-[#0A2540]">
                    {dev.totalProjects}
                  </p>
                  <p className="text-[10px] text-slate-500">Projects</p>
                </div>
                <div className="px-3 py-2 text-center">
                  <p className="font-mono text-base font-bold text-[#0A2540]">
                    {dev.totalConnections.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-slate-500">Connections</p>
                </div>
                <div className="px-3 py-2 text-center">
                  <p className="font-mono text-base font-bold text-[#0A2540]">
                    {dev.capacityMw} MW
                  </p>
                  <p className="text-[10px] text-slate-500">Capacity</p>
                </div>
              </div>

              {/* Track Record Bar */}
              <div className="mb-4">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Track Record</span>
                  <span className="font-mono text-xs font-semibold text-[#0A2540]">
                    {dev.yearsOperating} yrs
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#00A86B]"
                    style={{ width: `${trackBarWidth}%` }}
                    role="progressbar"
                    aria-valuenow={dev.yearsOperating}
                    aria-valuemin={0}
                    aria-valuemax={15}
                    aria-label={`${dev.yearsOperating} years operating`}
                  />
                </div>
              </div>

              {/* Project Type Badges */}
              <div className="mb-4 flex flex-wrap gap-1.5">
                {dev.projectTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1 rounded-full border border-[#0A2540]/15 bg-[#0A2540]/5 px-2.5 py-0.5 text-xs font-medium text-[#0A2540]"
                  >
                    <Zap className="h-2.5 w-2.5" aria-hidden="true" />
                    {type}
                  </span>
                ))}
              </div>

              {/* Action */}
              <div className="mt-auto">
                {dev.id === 'DEV-003' ? (
                  <Button
                    asChild
                    variant="default"
                    size="sm"
                    className="w-full bg-[#0A2540] text-white hover:bg-[#0A2540]/90"
                  >
                    <Link href={'/marketplace/developers/greenlight' as Route}>
                      <Eye className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                      View Profile
                    </Link>
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full bg-[#0A2540] text-white hover:bg-[#0A2540]/90"
                  >
                    <Eye className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                    View Profile
                  </Button>
                )}
              </div>
            </article>
          );
        })}
      </div>
      )}
    </div>
  );
}
