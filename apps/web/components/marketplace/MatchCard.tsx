"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MatchDimension {
  label: string;
  score: number;
  weight: "primary" | "secondary";
}

export interface MatchCardProps {
  developerProject: string;
  projectType: string;
  financier: string;
  financierType: string;
  overallScore: number;
  status: "In Discussion" | "Interested" | "New Match";
  dimensions: MatchDimension[];
}

// ─── Helpers (locked to IFC thresholds from PROGRESS.md) ─────────────────────

function scoreColor(score: number): string {
  if (score >= 80) return "#00A86B";
  if (score >= 65) return "#D97706";
  return "#DC2626";
}

function statusStyle(status: MatchCardProps["status"]): string {
  switch (status) {
    case "In Discussion": return "bg-emerald-50 text-emerald-800";
    case "Interested":    return "bg-amber-50 text-amber-800";
    case "New Match":     return "bg-sky-50 text-sky-800";
  }
}

function statusDotColor(status: MatchCardProps["status"]): string {
  switch (status) {
    case "In Discussion": return "bg-[#00A86B]";
    case "Interested":    return "bg-amber-500";
    case "New Match":     return "bg-sky-500";
  }
}

// ─── Animated dimension bar ───────────────────────────────────────────────────

function DimensionBar({
  dimension,
  index,
  animate,
}: {
  dimension: MatchDimension;
  index: number;
  animate: boolean;
}) {
  const isPrimary = dimension.weight === "primary";
  const color = scoreColor(dimension.score);

  return (
    <div className="flex items-center gap-3">
      <span
        className={`text-right shrink-0 w-44 text-xs leading-tight ${
          isPrimary
            ? "font-semibold text-slate-800"
            : "font-medium text-slate-500"
        }`}
      >
        {dimension.label}
      </span>

      {/* Track */}
      <div
        className={`relative w-48 sm:w-56 md:w-64 rounded-full bg-slate-200 overflow-hidden ${
          isPrimary ? "h-2" : "h-1.5"
        }`}
      >
        {/* Tick marks at 25 / 50 / 75% */}
        {[25, 50, 75].map((tick) => (
          <div
            key={tick}
            className="absolute top-0 bottom-0 w-px bg-white/60"
            style={{ left: `${tick}%` }}
          />
        ))}

        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all"
          style={{
            width: animate ? `${dimension.score}%` : "0%",
            backgroundColor: color,
            opacity: isPrimary ? 1 : 0.7,
            transitionDuration: "700ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: `${index * 60}ms`,
          }}
        />
      </div>

      {/* Value */}
      <span
        className={`shrink-0 w-10 text-right text-xs tabular-nums ${
          isPrimary ? "font-semibold text-slate-800" : "font-medium text-slate-500"
        }`}
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        {dimension.score}%
      </span>
    </div>
  );
}

// ─── MatchCard ────────────────────────────────────────────────────────────────

export function MatchCard({
  developerProject,
  projectType,
  financier,
  financierType,
  overallScore,
  status,
  dimensions,
}: MatchCardProps) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0]?.isIntersecting) setAnimate(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const ringColor = scoreColor(overallScore);

  return (
    <div
      ref={ref}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start gap-4 px-5 pt-5 pb-4 border-b border-slate-100">
        {/* Developer */}
        <div className="min-w-0 w-56">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Developer Project
          </p>
          <p className="text-sm font-semibold text-slate-900 leading-snug">
            {developerProject}
          </p>
          <span className="inline-block mt-1.5 text-[10px] font-medium text-slate-500 bg-slate-100 rounded px-1.5 py-0.5">
            {projectType}
          </span>
        </div>

        {/* Score ring — centred */}
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <div
            className="relative w-16 h-16 rounded-full"
            style={{
              background: `conic-gradient(${ringColor} ${overallScore * 3.6}deg, #e2e8f0 0deg)`,
            }}
          >
            <div className="absolute inset-[7px] rounded-full bg-white flex flex-col items-center justify-center">
              <span
                className="text-base font-bold leading-none"
                style={{
                  color: ringColor,
                  fontFamily: "'IBM Plex Mono', monospace",
                }}
              >
                {overallScore}
              </span>
              <span className="text-[8px] font-medium text-slate-400 uppercase tracking-wide mt-0.5">
                match
              </span>
            </div>
          </div>
        </div>

        {/* Financier */}
        <div className="min-w-0 w-56 text-right">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1">
            Financier
          </p>
          <p className="text-sm font-semibold text-slate-900 leading-snug">
            {financier}
          </p>
          <span className="inline-block mt-1.5 text-[10px] font-medium text-slate-500 bg-slate-100 rounded px-1.5 py-0.5">
            {financierType}
          </span>
        </div>
      </div>

      {/* Dimension bars */}
      <div className="px-5 py-4 space-y-2.5 bg-slate-50/60">
        {/* Column headers */}
        <div className="flex items-center gap-3 pb-1.5 border-b border-slate-200/80 mb-1">
          <span className="w-44 text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Dimension
          </span>
          <div className="w-48 sm:w-56 md:w-64 flex justify-between text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
          <span className="w-10 text-right text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Score
          </span>
        </div>

        {dimensions.map((dim, i) => (
          <DimensionBar key={dim.label} dimension={dim} index={i} animate={animate} />
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-white">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle(status)}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusDotColor(status)}`} />
          {status}
        </span>
        <button className="text-xs font-semibold text-slate-600 hover:text-[#00A86B] transition-colors underline underline-offset-2">
          View Match →
        </button>
      </div>
      </div>
    </div>
  );
}
