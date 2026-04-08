'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ShieldCheck, FileCheck, Check } from 'lucide-react';

function RegisterForm() {
  const searchParams = useSearchParams();
  const roleType = searchParams.get('type') as 'developer' | 'financier' | null;

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Financier multi-select state
  const [selectedCapitalTypes, setSelectedCapitalTypes] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [selectedDevStatus, setSelectedDevStatus] = useState<string[]>([]);
  const [selectedOfftaker, setSelectedOfftaker] = useState<string[]>([]);
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1500);
  }

  const inputClassName = "w-full rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none";
  const inputStyle = { background: "rgba(255,255,255,0.055)", border: "1px solid rgba(255,255,255,0.12)" };
  const selectClassName = "w-full appearance-none rounded-lg px-4 py-3 text-white focus:outline-none [&>option]:bg-[#0A2540] [&>option]:text-white";
  const textareaClassName = "w-full rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none min-h-[80px] resize-none";

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "rgba(245,194,0,0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(245,194,0,0.08)";
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
    e.currentTarget.style.boxShadow = "none";
  }

  function renderMultiSelect(
    label: string,
    options: string[],
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) {
    return (
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-300">{label}</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {options.map((opt) => (
            <label key={opt} className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              selected.includes(opt)
                ? 'text-white'
                : 'text-white/50 hover:text-white/70'
            }`} style={{
              background: selected.includes(opt) ? 'rgba(0,168,107,0.25)' : 'rgba(255,255,255,0.055)',
              border: `1px solid ${selected.includes(opt) ? 'rgba(0,168,107,0.5)' : 'rgba(255,255,255,0.12)'}`,
            }}>
              <input type="checkbox" className="sr-only" checked={selected.includes(opt)}
                onChange={() => setSelected(prev => prev.includes(opt) ? prev.filter(v => v !== opt) : [...prev, opt])} />
              {opt}
            </label>
          ))}
        </div>
      </div>
    );
  }

  const hasRole = roleType === 'developer' || roleType === 'financier';

  return (
    <div className="flex min-h-screen w-full relative" style={{ background: "#0A2540" }}>

      {/* Amber radial glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        background: `radial-gradient(ellipse 80% 60% at 15% 20%, rgba(245,194,0,0.07) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(13,51,73,0.4) 0%, transparent 60%)`,
      }} />

      {/* Fine grid */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      {/* Noise texture */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "128px 128px",
      }} />

      {/* 2px amber top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, height: "2px", zIndex: 50,
        background: "linear-gradient(90deg, transparent 0%, #F5C200 30%, #F5C200 70%, transparent 100%)",
      }} />

      {/* ── Left panel ───────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:w-3/5" style={{ position: "relative", zIndex: 1 }}>
        <div className={`w-full ${hasRole ? 'max-w-lg' : 'max-w-md'}`}>
          <div className="rounded-2xl p-10 relative" style={{
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 0 0 1px rgba(245,194,0,0.06), 0 24px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}>

            {/* Wordmark */}
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-bold text-white">SEF-DP</span>
              <span className="h-2 w-2 rounded-full" style={{ background: "#F5C200" }} aria-hidden="true" />
            </div>
            <p className="mt-1 text-sm text-slate-400">
              Sustainable Energy Finance Developer Platform
            </p>

            {/* Role indicator badge */}
            {roleType === 'developer' && (
              <span className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "rgba(245,194,0,0.15)", color: "#F5C200", border: "1px solid rgba(245,194,0,0.3)" }}>Developer Registration</span>
            )}
            {roleType === 'financier' && (
              <span className="mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold" style={{ background: "rgba(0,168,107,0.15)", color: "#00A86B", border: "1px solid rgba(0,168,107,0.3)" }}>Financier Registration</span>
            )}

            <div className="my-6 border-b border-white/10" />

            {submitted ? (
              /* Success screen */
              <div className="space-y-4 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00A86B]/20">
                  <Check className="h-6 w-6 text-[#00A86B]" />
                </div>
                <h2 className="font-display text-lg font-semibold text-white">
                  Account request submitted
                </h2>
                <p className="text-sm text-slate-400">
                  Registration received. Our team will be in touch.
                </p>
                <Link
                  href="/login"
                  className="mt-4 inline-block text-sm hover:underline"
                  style={{ color: "#F5C200" }}
                >
                  &larr; Back to sign in
                </Link>
              </div>
            ) : !hasRole ? (
              /* Role selection screen */
              <div className="space-y-4">
                <p className="text-sm text-slate-300 text-center">Select your registration type</p>
                <div className="grid grid-cols-2 gap-3">
                  <Link href="/register?type=developer" className="rounded-xl p-4 text-center transition-all hover:scale-[1.02]" style={{ background: "rgba(245,194,0,0.08)", border: "1px solid rgba(245,194,0,0.25)" }}>
                    <p className="text-sm font-semibold text-white">Solar Developer</p>
                    <p className="text-xs text-white/40 mt-1">List projects & get matched</p>
                  </Link>
                  <Link href="/register?type=financier" className="rounded-xl p-4 text-center transition-all hover:scale-[1.02]" style={{ background: "rgba(0,168,107,0.08)", border: "1px solid rgba(0,168,107,0.25)" }}>
                    <p className="text-sm font-semibold text-white">Financier / DFI</p>
                    <p className="text-xs text-white/40 mt-1">Browse pre-screened pipeline</p>
                  </Link>
                </div>
              </div>
            ) : (
              /* Registration form */
              <form onSubmit={handleSubmit}>
                {/* Group 1 — About You */}
                <div className="mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                    About You
                    <span className="flex-1 border-t border-white/10" />
                  </p>
                  {/* First Name + Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="mb-1.5 block text-sm font-medium text-slate-300"
                      >
                        First Name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Jane"
                        autoComplete="given-name"
                        className={inputClassName}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="mb-1.5 block text-sm font-medium text-slate-300"
                      >
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Okafor"
                        autoComplete="family-name"
                        className={inputClassName}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  {/* Email Address */}
                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@organisation.ng"
                      autoComplete="email"
                      className={inputClassName}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* Group 2 — Your Organisation */}
                <div className="mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                    Your Organisation
                    <span className="flex-1 border-t border-white/10" />
                  </p>
                  {/* Organisation Name */}
                  <div>
                    <label
                      htmlFor="organisation"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Organisation Name
                    </label>
                    <input
                      id="organisation"
                      type="text"
                      placeholder="Acme Solar Ltd"
                      autoComplete="organization"
                      className={inputClassName}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                  {/* Organisation Type */}
                  <div className="mt-4">
                    <label
                      htmlFor="orgType"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Organisation Type
                    </label>
                    <select
                      id="orgType"
                      defaultValue=""
                      className={selectClassName}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled className="text-slate-500">
                        Select organisation type
                      </option>
                      <option value="solar_developer">Solar Developer</option>
                      <option value="dfi">DFI / Development Finance</option>
                      <option value="commercial_bank">Commercial Bank</option>
                      <option value="impact_fund">Impact Fund</option>
                      <option value="private_equity">Private Equity</option>
                      <option value="institutional_investor">Institutional Investor</option>
                      <option value="consultant">Consultant / Advisory</option>
                      <option value="government">Government / Regulator</option>
                    </select>
                  </div>
                  {/* Role / Designation */}
                  <div className="mt-4">
                    <label
                      htmlFor="role"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Your Role / Designation
                    </label>
                    <select
                      id="role"
                      defaultValue=""
                      className={`${selectClassName} [&>optgroup]:bg-[#0A2540] [&>optgroup]:text-slate-400`}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="" disabled className="text-slate-500">
                        Select your role
                      </option>
                      <optgroup label="Executive">
                        <option value="ceo">Chief Executive Officer</option>
                        <option value="cfo">Chief Financial Officer</option>
                        <option value="coo">Chief Operating Officer</option>
                        <option value="md">Managing Director</option>
                      </optgroup>
                      <optgroup label="Management">
                        <option value="director">Director</option>
                        <option value="gm">General Manager</option>
                        <option value="vp">Vice President</option>
                        <option value="hod">Head of Department</option>
                      </optgroup>
                      <optgroup label="Professional">
                        <option value="investment_analyst">Investment Analyst</option>
                        <option value="portfolio_manager">Portfolio Manager</option>
                        <option value="programme_officer">Programme Officer</option>
                        <option value="project_manager">Project Manager</option>
                        <option value="legal_counsel">Legal Counsel</option>
                        <option value="compliance_officer">Compliance Officer</option>
                        <option value="technical_advisor">Technical Advisor</option>
                        <option value="financial_analyst">Financial Analyst</option>
                        <option value="risk_analyst">Risk Analyst</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="other">Other</option>
                      </optgroup>
                    </select>
                  </div>
                </div>

                {/* Group 3 — Security */}
                <div className="mb-5">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                    Security
                    <span className="flex-1 border-t border-white/10" />
                  </p>
                  {/* Password */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={inputClassName}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                  {/* Confirm Password */}
                  <div className="mt-4">
                    <label
                      htmlFor="confirmPassword"
                      className="mb-1.5 block text-sm font-medium text-slate-300"
                    >
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      className={inputClassName}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* ── Developer-specific sections ──────────────────────── */}
                {roleType === 'developer' && (
                  <>
                    {/* Project Cost */}
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                        Project Cost
                        <span className="flex-1 border-t border-white/10" />
                      </p>
                      <div>
                        <label htmlFor="financialModel" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Describe your preliminary financial model including capex, tariff and grant impact
                        </label>
                        <textarea
                          id="financialModel"
                          placeholder="Include capex breakdown, expected tariff, and anticipated grant impact..."
                          className={textareaClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="fundingRequirement" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Total funding requirement (&#8358;)
                        </label>
                        <input
                          id="fundingRequirement"
                          type="text"
                          placeholder="e.g. 500,000,000"
                          className={inputClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="financingType" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Type of financing sought
                        </label>
                        <select
                          id="financingType"
                          defaultValue=""
                          className={selectClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled className="text-slate-500">Select financing type</option>
                          <option value="equity">Equity</option>
                          <option value="debt">Debt</option>
                          <option value="mezzanine">Mezzanine</option>
                          <option value="grant">Grant</option>
                          <option value="blended_finance">Blended Finance</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* Licences & Permits */}
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                        Licences & Permits
                        <span className="flex-1 border-t border-white/10" />
                      </p>
                      <div>
                        <label htmlFor="licences" className="mb-1.5 block text-sm font-medium text-slate-300">
                          List applicable state licences and permits
                        </label>
                        <textarea
                          id="licences"
                          placeholder="e.g. NERC licence, state permits..."
                          className={textareaClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="importWaiver" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Import waiver / tax holiday status
                        </label>
                        <select
                          id="importWaiver"
                          defaultValue=""
                          className={selectClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled className="text-slate-500">Select status</option>
                          <option value="not_applicable">Not Applicable</option>
                          <option value="applied">Applied</option>
                          <option value="in_process">In Process</option>
                          <option value="approved">Approved</option>
                        </select>
                      </div>
                    </div>

                    {/* Developer History & Track Record */}
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                        Developer History & Track Record
                        <span className="flex-1 border-t border-white/10" />
                      </p>
                      <div>
                        <label htmlFor="financialStatements" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Audited financial statements
                        </label>
                        <select
                          id="financialStatements"
                          defaultValue=""
                          className={selectClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled className="text-slate-500">Select availability</option>
                          <option value="not_available">Not Available</option>
                          <option value="tier1_bank">Available — Tier 1 Bank</option>
                          <option value="other_bank">Available — Other Bank</option>
                        </select>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="cacStatus" className="mb-1.5 block text-sm font-medium text-slate-300">
                          CAC registration & tax certificates
                        </label>
                        <select
                          id="cacStatus"
                          defaultValue=""
                          className={selectClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled className="text-slate-500">Select status</option>
                          <option value="not_available">Not Available</option>
                          <option value="in_progress">In Progress</option>
                          <option value="submitted">Submitted</option>
                          <option value="verified">Verified</option>
                        </select>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="portfolioType" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Portfolio type
                        </label>
                        <select
                          id="portfolioType"
                          defaultValue=""
                          className={selectClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled className="text-slate-500">Select portfolio type</option>
                          <option value="single">Single Project</option>
                          <option value="portfolio">Portfolio of Projects</option>
                        </select>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="debtSummary" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Summarise key terms of any outstanding borrowings (leave blank if none)
                        </label>
                        <textarea
                          id="debtSummary"
                          placeholder="e.g. ₦200M facility from GTBank, 5-year tenor, 18% interest..."
                          className={textareaClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="equityRaised" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Equity raised to date (&#8358;) — enter 0 if none
                        </label>
                        <input
                          id="equityRaised"
                          type="text"
                          placeholder="e.g. 150,000,000"
                          className={inputClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="existingPortfolio" className="mb-1.5 block text-sm font-medium text-slate-300">
                          List existing sites: project name, location, capex, connections, grants collected
                        </label>
                        <textarea
                          id="existingPortfolio"
                          placeholder="e.g. Sokoto Mini-Grid, Sokoto State, ₦450M capex, 800 connections..."
                          className={textareaClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                        Project Details
                        <span className="flex-1 border-t border-white/10" />
                      </p>
                      <div>
                        <label htmlFor="projectName" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Project name
                        </label>
                        <input
                          id="projectName"
                          type="text"
                          placeholder="e.g. Katsina Solar Mini-Grid"
                          className={inputClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="contactDetails" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Key contact name, phone, and email for this project
                        </label>
                        <textarea
                          id="contactDetails"
                          placeholder="e.g. Amina Yusuf, +234 803 XXX XXXX, amina@company.ng"
                          className={textareaClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="projectDescription" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Describe the project: type, location, host community, timelines, risk matrix
                        </label>
                        <textarea
                          id="projectDescription"
                          placeholder="e.g. 500kW solar mini-grid in Dutsinma LGA, Katsina State..."
                          className={textareaClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="epcContractor" className="mb-1.5 block text-sm font-medium text-slate-300">
                          EPC contractor if selected, or state &apos;In-house&apos;
                        </label>
                        <input
                          id="epcContractor"
                          type="text"
                          placeholder="e.g. Greenlight Engineering Ltd"
                          className={inputClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="technicalDesign" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Technical design available
                        </label>
                        <select
                          id="technicalDesign"
                          defaultValue=""
                          className={selectClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled className="text-slate-500">Select status</option>
                          <option value="not_yet">Not yet</option>
                          <option value="schematic">Schematic only</option>
                          <option value="full_design">Full design available</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* ── Financier-specific sections ──────────────────────── */}
                {roleType === 'financier' && (
                  <>
                    {/* Type & Stage of Financing */}
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                        Type & Stage of Financing
                        <span className="flex-1 border-t border-white/10" />
                      </p>
                      {renderMultiSelect('Capital type', ['Equity', 'Debt', 'Mezzanine', 'Grants', 'Guarantees', 'Blended Finance'], selectedCapitalTypes, setSelectedCapitalTypes)}
                      <div className="mt-4">
                        {renderMultiSelect('Project stage supported', ['Early Development', 'Construction', 'Operational Refinancing', 'Portfolio Aggregation'], selectedStages, setSelectedStages)}
                      </div>
                      <div className="mt-4">
                        <label htmlFor="minTicket" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Minimum commitment per project (&#8358;)
                        </label>
                        <input
                          id="minTicket"
                          type="text"
                          placeholder="e.g. 100,000,000"
                          className={inputClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="maxTicket" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Maximum commitment per project (&#8358;)
                        </label>
                        <input
                          id="maxTicket"
                          type="text"
                          placeholder="e.g. 2,000,000,000"
                          className={inputClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="corporateSpv" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Corporate vs SPV
                        </label>
                        <select
                          id="corporateSpv"
                          defaultValue=""
                          className={selectClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled className="text-slate-500">Select preference</option>
                          <option value="corporate">Corporate-level only</option>
                          <option value="spv">Project SPV only</option>
                          <option value="both">Both</option>
                        </select>
                      </div>
                    </div>

                    {/* Investment Criteria */}
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                        Investment Criteria
                        <span className="flex-1 border-t border-white/10" />
                      </p>
                      {renderMultiSelect('Technology preferences', ['Solar PV', 'Wind', 'Biomass', 'Mini-grids', 'Battery Storage', 'Hybrid'], selectedTech, setSelectedTech)}
                      <div className="mt-4">
                        <label htmlFor="geoFocus" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Countries or regions of focus
                        </label>
                        <textarea
                          id="geoFocus"
                          placeholder="e.g. Nigeria, West Africa, Sub-Saharan Africa"
                          className={textareaClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="minCapacity" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Minimum project size (kWp or MW)
                        </label>
                        <input
                          id="minCapacity"
                          type="text"
                          placeholder="e.g. 100 kWp"
                          className={inputClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        {renderMultiSelect('Required development status', ['Land rights secured', 'Permits in place', 'PPAs signed', 'Construction ready'], selectedDevStatus, setSelectedDevStatus)}
                      </div>
                      <div className="mt-4">
                        {renderMultiSelect('Off-taker profile', ['Utility-scale', 'C&I clients', 'Government-backed', 'Smallholder/community'], selectedOfftaker, setSelectedOfftaker)}
                      </div>
                    </div>

                    {/* Financial Terms & Structure */}
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                        Financial Terms & Structure
                        <span className="flex-1 border-t border-white/10" />
                      </p>
                      <div>
                        <label htmlFor="tenor" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Loan tenor / investment horizon (years)
                        </label>
                        <input
                          id="tenor"
                          type="text"
                          placeholder="e.g. 7"
                          className={inputClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="security" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Collateral, guarantees, or escrow requirements
                        </label>
                        <textarea
                          id="security"
                          placeholder="e.g. First lien on project assets, escrow for debt service..."
                          className={textareaClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="currency" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Currency
                        </label>
                        <select
                          id="currency"
                          defaultValue=""
                          className={selectClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled className="text-slate-500">Select currency preference</option>
                          <option value="usd">USD only</option>
                          <option value="ngn">NGN only</option>
                          <option value="both">Both USD and NGN</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div className="mt-4">
                        <label htmlFor="blendedFinance" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Blended finance
                        </label>
                        <select
                          id="blendedFinance"
                          defaultValue=""
                          className={selectClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled className="text-slate-500">Select preference</option>
                          <option value="not_open">Not open to blended finance</option>
                          <option value="dfi_cofinancing">Open to co-financing with DFIs</option>
                          <option value="grant_cofinancing">Open to grant co-financing</option>
                          <option value="all_blended">Open to all blended structures</option>
                        </select>
                      </div>
                    </div>

                    {/* Due Diligence & Process */}
                    <div className="mb-5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-4 flex items-center gap-3">
                        Due Diligence & Process
                        <span className="flex-1 border-t border-white/10" />
                      </p>
                      {renderMultiSelect('Required documentation', ['Financial model', 'Feasibility studies', 'EPC contracts', 'Permits', 'PPAs', 'Audited financials'], selectedDocs, setSelectedDocs)}
                      <div className="mt-4">
                        <label htmlFor="approvalTimeline" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Typical time to financial close (weeks)
                        </label>
                        <input
                          id="approvalTimeline"
                          type="text"
                          placeholder="e.g. 12"
                          className={inputClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                      <div className="mt-4">
                        <label htmlFor="trackRecord" className="mb-1.5 block text-sm font-medium text-slate-300">
                          Minimum developer experience or management team requirements
                        </label>
                        <textarea
                          id="trackRecord"
                          placeholder="e.g. Minimum 3 years operating mini-grids, proven connections track record..."
                          className={textareaClassName}
                          style={inputStyle}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-80"
                  style={{ background: "linear-gradient(135deg, #F5C200 0%, #E6A800 100%)", color: "#0D1E2E", fontWeight: 600 }}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    roleType === 'developer' ? 'Register as Developer' :
                    roleType === 'financier' ? 'Register as Financier' :
                    'Create Account'
                  )}
                </button>
              </form>
            )}

            {/* Sign in link */}
            {!submitted && (
              <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="hover:underline"
                  style={{ color: "#F5C200" }}
                >
                  Sign in &rarr;
                </Link>
              </p>
            )}

            {/* Footer notice */}
            <p className="mt-8 text-center text-xs text-slate-500">
              Access restricted to authorised programme participants. For access
              requests contact your programme administrator.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right panel (desktop only) ───────────────────────────────── */}
      <div className="hidden lg:flex lg:w-2/5 flex-col items-center justify-center p-12" style={{ position: "relative", zIndex: 1, borderLeft: "1px solid rgba(255,255,255,0.07)", background: "rgba(245,194,0,0.02)" }}>
        {/* Quote + pills */}
        <div className="flex flex-1 flex-col justify-center">
          <p className="text-3xl font-semibold leading-relaxed text-white/90" style={{ fontFamily: "'Sora', sans-serif" }}>
            &ldquo;Digital infrastructure for{" "}
            <span style={{ color: "#F5C200" }}>Africa&apos;s energy transition</span>.&rdquo;
          </p>

          <div className="mt-10 flex flex-col gap-5 max-w-xs">
            {[
              { Icon: ShieldCheck, label: "Nigerian NDPA Compliant", sub: "Data privacy regulated" },
              { Icon: FileCheck, label: "SEforALL Partner Platform", sub: "UN sustainable energy initiative" },
              { Icon: Check, label: "International Standards Aligned", sub: "World Bank verified framework" },
            ].map(({ Icon, label, sub }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style={{
                  background: "rgba(245,194,0,0.12)",
                  border: "1px solid rgba(245,194,0,0.25)",
                }}>
                  <Icon className="w-3.5 h-3.5" style={{ color: "#F5C200" }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/85">{label}</p>
                  <p className="text-xs text-white/40">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <p style={{ fontSize: 10, color: '#64748b', letterSpacing: '0.1em', marginBottom: 8 }}>SUPPORTED BY</p>
            <img src="/logos/seforall-logo.png" alt="Sustainable Energy for All" style={{ height: 40, objectFit: 'contain', mixBlendMode: 'screen' }} />
          </div>

          <svg viewBox="0 0 280 160" className="w-full mt-8" style={{ opacity: 0.35 }} fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="16" stroke="#F5C200" strokeWidth="1.5" />
            <circle cx="40" cy="80" r="16" stroke="#F5C200" strokeWidth="1.5" />
            <circle cx="40" cy="120" r="16" stroke="#F5C200" strokeWidth="1.5" />
            <circle cx="240" cy="55" r="16" stroke="white" strokeWidth="1.5" />
            <circle cx="240" cy="105" r="16" stroke="white" strokeWidth="1.5" />
            <line x1="56" y1="40" x2="224" y2="55" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="56" y1="80" x2="224" y2="55" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="56" y1="80" x2="224" y2="105" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
            <line x1="56" y1="120" x2="224" y2="105" stroke="#F5C200" strokeWidth="1" strokeDasharray="4 3" />
            <circle cx="140" cy="80" r="20" stroke="#F5C200" strokeWidth="1.5" fill="rgba(245,194,0,0.08)" />
            <text x="140" y="85" textAnchor="middle" fill="#F5C200" fontSize="8" fontFamily="IBM Plex Mono">SEF-DP</text>
          </svg>
          <p className="text-center text-xs text-white/25 mt-2 font-mono tracking-wide">Developer → Platform → Financier</p>
        </div>

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen w-full items-center justify-center" style={{ background: "#0A2540" }}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white/60" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
