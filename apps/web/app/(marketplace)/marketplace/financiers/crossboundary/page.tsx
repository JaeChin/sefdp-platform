import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Globe,
  Landmark,
  FileCheck,
  GitCompare,
  Briefcase,
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const investmentCriteria = [
  { label: 'Instrument Type', value: 'Project Finance / Equity' },
  { label: 'Deal Size Range', value: '₦500,000,000 – ₦15,000,000,000', note: '₦500M – ₦15B' },
  { label: 'Minimum Project Capacity', value: '50 kWp' },
  { label: 'Preferred Geography', value: 'North-West, North-Central, North-East Nigeria' },
  { label: 'Development Stage', value: 'Construction-ready to operational' },
  { label: 'Grant Requirement', value: 'World Bank PBG or equivalent required' },
  { label: 'Blended Finance', value: 'Yes — private capital + PBG' },
];

const ddRequirements = [
  { name: 'CAC Registration & Tax Clearance', done: true },
  { name: 'REA Mini-Grid Licence', done: true },
  { name: 'Approved Grant Agreement (REA/WB/UEF)', done: true },
  { name: 'Audited Financials (minimum 2 years)', done: true },
  { name: 'Site Survey & Load Assessment', done: true },
  { name: 'Environmental & Social screening', done: true },
  { name: 'Full KYC completed at binding agreement stage', done: false },
];

const portfolio = [
  {
    name: 'Partner Energy Access Nigeria',
    amount: '₦94,800,000,000',
    amountShort: '₦94.8B',
    location: 'Niger State',
    status: 'Active — Commercial Operations Launched 2024',
    statusColor: 'bg-green-50 text-[#00A86B] border-green-200',
  },
  {
    name: 'Open Pipeline',
    amount: '₦47,400,000,000',
    amountShort: '₦47.4B',
    location: 'Expanding — seeking additional developer partners',
    status: 'Accepting Applications',
    statusColor: 'bg-amber-50 text-[#F59E0B] border-amber-200',
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CrossBoundaryFinancierPage() {
  return (
    <div className="space-y-8">
      {/* Back button */}
      <Link
        href="/marketplace/financiers"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#0A2540] transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Financiers
      </Link>

      {/* ── Header Card ───────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-2xl font-bold text-[#0A2540]">
                Emmanuel Financiers
              </h1>
              <span className="rounded-full border border-green-200 bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-[#00A86B]">
                Impact Fund
              </span>
            </div>
            <p className="text-sm text-slate-500">
              Dedicated project finance platform for African mini-grids
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                Nairobi, Kenya (Nigeria operations active)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                Nigeria, Kenya, Tanzania, Uganda, Rwanda, Mozambique, Zambia, C&ocirc;te d&apos;Ivoire, Benin
              </span>
            </div>
          </div>

          {/* Nigeria Track Record badge */}
          <div className="flex flex-col items-center rounded-xl border border-[#0A2540]/10 bg-[#0A2540]/5 px-6 py-4">
            <span className="text-xs font-medium text-slate-500">Nigeria Committed</span>
            <span className="font-mono text-3xl font-bold leading-none text-[#0A2540]">$60M</span>
            <span className="mt-1 text-center text-[10px] text-slate-400">
              Largest mini-grid project<br />finance transaction in Africa
            </span>
          </div>
        </div>
      </div>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-display text-lg font-bold text-[#0A2540]">About</h2>
        <div className="space-y-4 text-sm leading-relaxed text-slate-600">
          <p>
            Emmanuel Financiers is a dedicated project finance platform for solar mini-grids
            across Africa. In Nigeria, the fund committed $60 million alongside World Bank
            Performance-Based Grants administered by the Rural Electrification Agency — one of the
            largest mini-grid project finance transactions on the continent.
          </p>
          <p>
            The fund uses a blended finance model, co-investing private capital alongside PBG grants
            to accelerate mini-grid deployment. Nigeria operations are active across Niger State and
            expanding, with a target of connecting 150,000 people by 2026. Backed by leading
            institutional investors and development finance institutions.
          </p>
        </div>
      </section>

      {/* ── Investment Criteria ────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-display text-lg font-bold text-[#0A2540]">
          <Briefcase className="mr-2 inline-block h-5 w-5 text-[#0A2540]" aria-hidden="true" />
          Investment Criteria
        </h2>
        <div className="space-y-3">
          {investmentCriteria.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-1 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="text-xs font-medium text-slate-500">{item.label}</span>
              <span className="font-mono text-sm font-bold text-[#0A2540]">
                {item.value}
                {item.note && (
                  <span className="ml-2 text-xs font-normal text-slate-400">({item.note})</span>
                )}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Due Diligence Requirements ────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-display text-lg font-bold text-[#0A2540]">
          <FileCheck className="mr-2 inline-block h-5 w-5 text-[#00A86B]" aria-hidden="true" />
          Due Diligence Requirements
        </h2>
        <ul className="space-y-2.5">
          {ddRequirements.map((doc) => (
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

      {/* ── Nigeria Portfolio ─────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="mb-4 font-display text-lg font-bold text-[#0A2540]">
          <Landmark className="mr-2 inline-block h-5 w-5 text-[#0A2540]" aria-hidden="true" />
          Nigeria Portfolio
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {portfolio.map((deal) => (
            <div
              key={deal.name}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-display text-sm font-bold text-[#0A2540]">{deal.name}</h3>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Deal Value</span>
                  <span className="font-mono font-bold text-[#0A2540]">
                    {deal.amountShort}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  <span className="font-mono text-[10px] text-slate-400">{deal.amount}</span>
                </p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Location</span>
                  <span className="text-right text-slate-700">{deal.location}</span>
                </div>
              </div>
              <div className="mt-3">
                <span
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${deal.statusColor}`}
                >
                  {deal.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Active Matches ────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <GitCompare className="h-5 w-5 text-[#00A86B]" aria-hidden="true" />
          <div>
            <p className="text-sm text-slate-600">
              <span className="font-mono font-bold text-[#0A2540]">3</span> active matches on
              platform
            </p>
            <p className="text-sm">
              <span className="font-mono font-bold text-[#00A86B]">91%</span>
              <span className="ml-1 text-slate-500">avg compatibility score</span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
