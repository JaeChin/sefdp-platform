'use client';

import { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  Eye,
  Plus,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { ClaimsWizard } from '@/components/dares/claims-wizard';

// ─── Types ────────────────────────────────────────────────────────────────────

type ClaimDisplayStatus = 'in_review' | 'complete' | 'failed' | 'processing';

interface Claim {
  id: string;
  ref: string;
  project: string;
  milestone: string;
  claimType: string;
  connections: number | null;
  claimedAmountNgn: string;
  status: ClaimDisplayStatus;
  daysSinceSubmission: number;
  overdue: boolean;
}

// ─── Static Data ──────────────────────────────────────────────────────────────

const statusConfig: Record<
  ClaimDisplayStatus,
  { label: string; icon: React.ElementType; classes: string }
> = {
  in_review: {
    label: 'In Review',
    icon: Clock,
    classes: 'bg-amber-50 text-amber-700 border border-amber-200',
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
  processing: {
    label: 'Processing',
    icon: Loader2,
    classes: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
};

const claimsData: Claim[] = [
  {
    id: 'clm-kano-01',
    ref: 'CLM-2026-0041',
    project: 'Kano North Mini-Grid Cluster',
    milestone: 'M2: Operations Verification',
    claimType: 'PBG',
    connections: 850,
    claimedAmountNgn: '₦44,625,000',
    status: 'in_review',
    daysSinceSubmission: 8,
    overdue: false,
  },
  {
    id: 'clm-lagos-01',
    ref: 'CLM-2026-0039',
    project: 'Lagos Rooftop PBG Phase II',
    milestone: 'M1: Construction Completion',
    claimType: 'PBG',
    connections: 290,
    claimedAmountNgn: '₦15,225,000',
    status: 'processing',
    daysSinceSubmission: 5,
    overdue: false,
  },
  {
    id: 'clm-borno-01',
    ref: 'CLM-2026-0036',
    project: 'Borno Rural Cluster Phase I',
    milestone: 'M2: Operations Verification',
    claimType: 'PBG',
    connections: 1073,
    claimedAmountNgn: '₦56,332,500',
    status: 'in_review',
    daysSinceSubmission: 12,
    overdue: true,
  },
  {
    id: 'clm-kaduna-01',
    ref: 'CLM-2026-0028',
    project: 'Kaduna Rural Electrification',
    milestone: 'M2: Operations Verification',
    claimType: 'PBG',
    connections: 620,
    claimedAmountNgn: '₦32,550,000',
    status: 'complete',
    daysSinceSubmission: 21,
    overdue: false,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ClaimDisplayStatus }) {
  const cfg = statusConfig[status];
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${cfg.classes}`}
    >
      <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
      {cfg.label}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ClaimsPage() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <>
      <div className="space-y-6">
        {/* ── Header ──────────────────────────────────────────────── */}
        <PageHeader
          title="Claims"
          description="Submit and track disbursement claims against verified project milestones."
          action={
            <button
              type="button"
              onClick={() => setShowWizard(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0A2540] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0A2540]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540] focus-visible:ring-offset-2"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              New Claim
            </button>
          }
        />

        {/* ── Claims Table ─────────────────────────────────────────── */}
        <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-base font-semibold text-[#0A2540]">Submitted Claims</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Q1 2026 · All DARES programme components
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {[
                    'Claim ID',
                    'Project',
                    'Milestone',
                    'Claim Type',
                    'Connections',
                    'Claimed Amount',
                    'Status',
                    'Days Since Submission',
                    'Actions',
                  ].map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {claimsData.map((claim, idx) => (
                  <tr
                    key={claim.id}
                    className={`transition-colors ${
                      idx !== claimsData.length - 1 ? 'border-b border-slate-50' : ''
                    } ${
                      claim.overdue
                        ? 'bg-amber-50/50 hover:bg-amber-50'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-[#0A2540]">
                          {claim.ref}
                        </span>
                        {claim.overdue && (
                          <span
                            className="inline-flex items-center gap-0.5 rounded-full bg-red-100 px-1.5 py-0.5 font-mono text-[10px] font-bold text-red-700"
                            aria-label="Overdue"
                          >
                            <AlertCircle className="h-2.5 w-2.5" aria-hidden="true" />
                            OVERDUE
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-medium text-[#0A2540]">{claim.project}</span>
                    </td>
                    <td className="px-4 py-4 text-xs text-slate-600">{claim.milestone}</td>
                    <td className="px-4 py-4">
                      <span className="rounded-md bg-[#0A2540]/10 px-2 py-0.5 font-mono text-xs font-semibold text-[#0A2540]">
                        {claim.claimType}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      {claim.connections !== null ? (
                        <span className="font-mono text-sm font-semibold text-[#0A2540]">
                          {claim.connections.toLocaleString()}
                        </span>
                      ) : (
                        <span className="font-mono text-slate-400">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="font-mono text-sm font-bold text-[#0A2540]">
                        {claim.claimedAmountNgn}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={claim.status} />
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`font-mono text-sm font-semibold ${
                          claim.overdue
                            ? 'text-red-600'
                            : claim.daysSinceSubmission >= 7
                              ? 'text-amber-600'
                              : 'text-slate-600'
                        }`}
                      >
                        {claim.daysSinceSubmission} day{claim.daysSinceSubmission !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A2540] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0A2540]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540]"
                        aria-label={`Review claim ${claim.ref}`}
                      >
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        Review Claim
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between border-t border-slate-100 px-6 py-3">
            <p className="font-mono text-xs text-slate-400">
              {claimsData.length} claims · Q1 2026
            </p>
            <button
              type="button"
              onClick={() => setShowWizard(true)}
              className="text-xs font-medium text-[#0A2540] transition-colors hover:text-[#0A2540]/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A2540]"
            >
              + Submit a new claim
            </button>
          </div>
        </div>
      </div>

      {/* ── Full-screen Wizard Overlay ───────────────────────────── */}
      {showWizard && <ClaimsWizard onClose={() => setShowWizard(false)} />}
    </>
  );
}
