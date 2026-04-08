'use client';

const deals = [
  { project: "Kano North Mini-Grid Expansion", developer: "SOLAD", financier: "Emmanuel Financiers", type: "Mini-grid", dealSize: 840_000_000, ifcScore: 74, status: "In Discussion", updated: "2 Apr 2026" },
  { project: "Enugu Industrial Solar Park", developer: "Solar For Business", financier: "NSIA", type: "C&I", dealSize: 1_580_000_000, ifcScore: 82, status: "In Discussion", updated: "1 Apr 2026" },
  { project: "Borno Rural Cluster Phase II", developer: "RIPLE", financier: "Africa Financiers Institute", type: "Mini-grid", dealSize: 735_000_000, ifcScore: 71, status: "New Match", updated: "3 Apr 2026" },
  { project: "Ogun Peri-Urban Grid", developer: "Ruth London Energy", financier: "Sterling Bank", type: "Hybrid", dealSize: 525_000_000, ifcScore: 77, status: "In Discussion", updated: "31 Mar 2026" },
  { project: "Niger State SHS Programme", developer: "Rubitec Solar", financier: "Pending Match", type: "SHS", dealSize: 663_600_000, ifcScore: 61, status: "Awaiting Match", updated: "2 Apr 2026" },
];

const kpis = [
  { label: "Total Deals in Progress", value: "5" },
  { label: "Combined Deal Value", value: "₦4.2B" },
  { label: "Verified Developers", value: "3" },
  { label: "Avg Rating", value: "76/100" },
];

function getIfcScoreColor(): string {
  return '#00A86B';
}

function getStatusBadge(status: string) {
  let classes = 'inline-block rounded-full px-2.5 py-0.5 text-xs font-medium';
  switch (status) {
    case 'In Discussion':
      classes += ' bg-blue-50 text-blue-700';
      break;
    case 'New Match':
      classes += ' bg-green-50 text-green-700';
      break;
    case 'Awaiting Match':
      classes += ' bg-amber-50 text-amber-700';
      break;
    default:
      classes += ' bg-slate-50 text-slate-600';
  }
  return <span className={classes}>{status}</span>;
}

export default function RegulatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Central Bank of Nigeria</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">·</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#00A86B]">Read-Only Access</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0A2540]" style={{ fontFamily: "'Sora', sans-serif" }}>
            Regulatory Deal Tracking
          </h1>
          <p className="text-sm text-slate-500 mt-1">Live view of marketplace activity for regulatory oversight. No actions available from this view.</p>
        </div>
        <span className="text-xs font-mono text-slate-400 border border-slate-200 rounded px-2 py-1">
          CBN Oversight Portal · Read Only
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-xl px-5 py-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{kpi.label}</p>
            <p className="text-2xl font-bold text-slate-900 mt-1" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Disclaimer Banner */}
      <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-2.5 mb-4 text-xs text-amber-800">
        <span>⚠</span>
        <span>This view is provided for regulatory oversight purposes only. All data reflects live platform activity. Figures are in Nigerian Naira (NGN).</span>
      </div>

      {/* Deal Tracking Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-400 px-5 py-3">Project</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-400 px-5 py-3">Developer</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-400 px-5 py-3">Financier</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-400 px-5 py-3">Type</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-400 px-5 py-3">Deal Size</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-400 px-5 py-3">Rating</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-400 px-5 py-3">Status</th>
              <th className="text-left text-xs font-semibold uppercase tracking-widest text-slate-400 px-5 py-3">Last Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {deals.map((deal) => (
              <tr key={deal.project} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-slate-900">{deal.project}</td>
                <td className="px-5 py-3 text-slate-600">{deal.developer}</td>
                <td className="px-5 py-3 text-slate-600">{deal.financier}</td>
                <td className="px-5 py-3 text-slate-600">{deal.type}</td>
                <td className="px-5 py-3" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                  ₦{(deal.dealSize / 1_000_000).toFixed(0)}M
                </td>
                <td className="px-5 py-3 font-semibold" style={{ color: getIfcScoreColor(), fontFamily: "'IBM Plex Mono', monospace" }}>
                  {deal.ifcScore}
                </td>
                <td className="px-5 py-3">{getStatusBadge(deal.status)}</td>
                <td className="px-5 py-3 text-slate-500">{deal.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
