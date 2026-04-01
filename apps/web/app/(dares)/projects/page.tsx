'use client';

import { useState } from 'react';
import {
  Plus,
  Eye,
  Pencil,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';

type StatusType = 'in_review' | 'active' | 'complete' | 'failed' | 'needs_attention';

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

export default function DaresProjectsPage() {
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
    <div>
      <PageHeader
        title="Projects"
        description="Manage DARES energy projects and their disbursement pipelines."
        action={
          <button className="flex items-center gap-2 rounded-lg bg-[#0A2540] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0A2540]/90">
            <Plus className="h-4 w-4" />
            New Project
          </button>
        }
      />

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="text-base font-semibold text-[#0A2540]">All Projects</h2>
          <p className="mt-0.5 text-xs text-slate-500">
            {projectData.length} projects across the DARES programme
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
                  <td className="px-4 py-3.5 text-right">
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
      </div>
    </div>
  );
}
