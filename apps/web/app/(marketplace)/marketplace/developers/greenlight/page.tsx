import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Building2,
  Users,
  Zap,
  Sun,
  FileCheck,
  Banknote,
} from 'lucide-react';
import { Button } from '@sefdp/ui';

// ─── Score Helper ────────────────────────────────────────────────────────────

function getScoreStyle() {
  return { text: 'text-[#00A86B]', bg: 'bg-green-50', border: 'border-green-200' };
}

// ─── Data ────────────────────────────────────────────────────────────────────

const trackStats = [
  { label: 'Individuals reached in Nigeria', value: '2M+' },
  { label: 'Average tariff equivalent', value: '₦0.15/day' },
  { label: 'Active states', value: '23' },
  { label: 'Years operating in Nigeria', value: '14' },
];

const documents = [
  { name: 'CAC Registration', done: true },
  { name: 'Audited Financial Statements (3 years)', done: true },
  { name: 'IFC Environmental & Social Assessment (Category B)', done: true },
  { name: 'DFC Investment Agreement', done: true },
  { name: 'REA Licence', done: true },
  { name: 'DARES Grant Agreement', done: true },
  { name: 'World Bank KYC — In Progress', done: false },
];

const projects = [
  {
    name: 'Kano North PAYG Expansion',
    amount: '₦1.9B',
    capacity: '180 kWp',
    status: 'Active',
    statusColor: 'bg-green-50 text-[#00A86B] border-green-200',
  },
  {
    name: 'Borno Rural Solar Access',
    amount: '₦1.4B',
    capacity: '120 kWp',
    status: 'Under Review',
    statusColor: 'bg-amber-50 text-[#F59E0B] border-amber-200',
  },
  {
    name: 'Niger State SHS Programme',
    amount: '₦1.5B',
    capacity: '140 kWp',
    status: 'Pending Match',
    statusColor: 'bg-slate-50 text-slate-600 border-slate-200',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function GreenlightDeveloperPage() {
  const score = 82;
  const scoreStyle = getScoreStyle();

  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link
        href="/marketplace/developers"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#0A2540] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Developers
      </Link>

      {/* ── Header Card ───────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-2xl font-bold text-[#0A2540]">
                Solar For Business
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-[#00A86B]">
                <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                Verified Developer
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Africa&apos;s largest PAYG solar distribution network, active in Nigeria since 2011
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Lagos, Nigeria
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
                Solar For Business Nigeria
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                23 states across Nigeria
              </span>
            </div>
          </div>

          {/* Rating */}
          <div
            className={`flex flex-col items-center rounded-xl border px-6 py-4 ${scoreStyle.bg} ${scoreStyle.border}`}
          >
            <span className="text-xs font-medium text-slate-500">Rating</span>
            <span className={`font-mono text-4xl font-bold leading-none ${scoreStyle.text}`}>
              {score}
            </span>
            <span className="text-xs text-slate-400">/100</span>
          </div>
        </div>

        {/* Key stats row */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-center">
            <p className="font-mono text-lg font-bold text-[#0A2540]">2,000,000+</p>
            <p className="text-xs text-slate-500">Total Connections</p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-center">
            <p className="font-mono text-lg font-bold text-[#0A2540]">3</p>
            <p className="text-xs text-slate-500">Projects on Platform</p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-center">
            <p className="font-mono text-lg font-bold text-[#0A2540]">48.6 MWp</p>
            <p className="text-xs text-slate-500">Est. Generation Capacity</p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-center">
            <p className="font-mono text-lg font-bold text-[#0A2540]">14 yrs</p>
            <p className="text-xs text-slate-500">Years Active in Nigeria</p>
          </div>
        </div>
      </div>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-display text-lg font-bold text-[#0A2540]">About</h2>
        <div className="space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Solar For Business Nigeria is a leading off-grid solar developer and PAYG distributor.
            Active in Nigeria since 2011, the company has delivered clean energy access to over two
            million individuals across 23 states through a network of nearly 1,200 local Energy
            Officers and 24 flagship stores.
          </p>
          <p>
            The Nigerian subsidiary is backed by IFC, DFC, and leading development finance
            institutions, and has raised significant funding to impact millions of people across
            multiple countries.
          </p>
        </div>
      </section>

      {/* ── Track Record ──────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-display text-lg font-bold text-[#0A2540]">Track Record</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trackStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-4 text-center"
            >
              <p className="font-mono text-xl font-bold text-[#0A2540]">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Financing Sought ──────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-display text-lg font-bold text-[#0A2540]">
          <Banknote className="mr-2 inline-block h-5 w-5 text-[#00A86B]" aria-hidden="true" />
          Financing Sought
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-500">Funding Requirement</p>
            <p className="mt-1 font-mono text-lg font-bold text-[#0A2540]">
              ₦4,800,000,000{' '}
              <span className="text-sm font-normal text-slate-400">(₦4.8B)</span>
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-500">Mode of Financing</p>
            <p className="mt-1 text-sm font-semibold text-[#0A2540]">Blended (debt + grant)</p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-500">Grant Status</p>
            <p className="mt-1 text-sm font-semibold text-[#0A2540]">
              DARES Performance-Based Grant —{' '}
              <span className="text-[#00A86B]">Approved</span>
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-500">Use of Funds</p>
            <p className="mt-1 text-sm text-slate-600">
              PAYG portfolio expansion, last-mile distribution infrastructure, mini-grid site
              development in underserved Northern states
            </p>
          </div>
        </div>
      </section>

      {/* ── Documentation Status ──────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-display text-lg font-bold text-[#0A2540]">
          <FileCheck className="mr-2 inline-block h-5 w-5 text-[#00A86B]" aria-hidden="true" />
          Documentation Status
        </h2>
        <ul className="space-y-2.5">
          {documents.map((doc) => (
            <li key={doc.name} className="flex items-center gap-2.5 text-sm">
              {doc.done ? (
                <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-[#00A86B]" aria-hidden="true" />
              ) : (
                <Clock className="h-4.5 w-4.5 shrink-0 text-[#F59E0B]" aria-hidden="true" />
              )}
              <span className={doc.done ? 'text-slate-700' : 'text-[#F59E0B] font-medium'}>
                {doc.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Active Projects ───────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-display text-lg font-bold text-[#0A2540]">
          <Sun className="mr-2 inline-block h-5 w-5 text-[#F59E0B]" aria-hidden="true" />
          Active Projects
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.name}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-display text-sm font-bold text-[#0A2540]">{project.name}</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Capital</span>
                  <span className="font-mono font-bold text-[#0A2540]">{project.amount}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Capacity</span>
                  <span className="font-mono font-semibold text-[#0A2540]">{project.capacity}</span>
                </div>
              </div>
              <div className="mt-3">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${project.statusColor}`}
                >
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
