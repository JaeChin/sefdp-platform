'use client';

import { useState, useEffect } from 'react';
import {
  FolderKanban,
  Users,
  Landmark,
  TrendingUp,
  ArrowRight,
  Handshake,
  Plus,
  RefreshCw,
  UserPlus,
  BadgeCheck,
  X,
} from 'lucide-react';
import Link from 'next/link';
import type { Route } from 'next';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { PageHeader } from '@/components/shared/page-header';

// ─── Stat Cards ───────────────────────────────────────────────────────────────

const statCards: {
  title: string;
  value: number;
  delta: string;
  icon: React.ElementType;
  sparkline: number[];
}[] = [
  {
    title: 'Listed Projects',
    value: 42,
    delta: '+3 this month — 8 new in Q1 2026',
    icon: FolderKanban,
    sparkline: [28, 31, 33, 36, 38, 39, 42],
  },
  {
    title: 'Registered Developers',
    value: 18,
    delta: '+2 since last quarter — 5 verified',
    icon: Users,
    sparkline: [11, 12, 13, 14, 15, 16, 18],
  },
  {
    title: 'Active Financiers',
    value: 9,
    delta: '+1 — BII joined Feb 2026',
    icon: Landmark,
    sparkline: [5, 6, 7, 7, 8, 8, 9],
  },
  {
    title: 'Matches Made',
    value: 31,
    delta: '+7 in Q1 2026 — ₦4.2B in discussions',
    icon: TrendingUp,
    sparkline: [12, 16, 18, 22, 24, 28, 31],
  },
];

// ─── Activity Feed ────────────────────────────────────────────────────────────

const activityFeed: {
  id: number;
  icon: React.ElementType;
  text: string;
  time: string;
  borderClass: string;
  iconClass: string;
}[] = [
  {
    id: 1,
    icon: Handshake,
    text: 'Stanbic IBTC expressed interest in Kaduna Rural Electrification',
    time: '2 hours ago',
    borderClass: 'border-l-[#00A86B]',
    iconClass: 'bg-green-50 text-[#00A86B]',
  },
  {
    id: 2,
    icon: Plus,
    text: 'AfriSolar Power listed a new project: Borno C&I Solar Park (₦890M)',
    time: '5 hours ago',
    borderClass: 'border-l-blue-500',
    iconClass: 'bg-blue-50 text-blue-600',
  },
  {
    id: 3,
    icon: RefreshCw,
    text: 'Credit Score updated: Novawatt Energy Ltd → 74/100',
    time: 'Yesterday',
    borderClass: 'border-l-[#F59E0B]',
    iconClass: 'bg-amber-50 text-[#F59E0B]',
  },
  {
    id: 4,
    icon: Handshake,
    text: 'CrossBoundary Energy matched with Lagos Rooftop PBG Phase II',
    time: 'Yesterday',
    borderClass: 'border-l-[#00A86B]',
    iconClass: 'bg-green-50 text-[#00A86B]',
  },
  {
    id: 5,
    icon: UserPlus,
    text: 'New financier registered: British International Investment (BII)',
    time: '2 days ago',
    borderClass: 'border-l-blue-500',
    iconClass: 'bg-blue-50 text-blue-600',
  },
  {
    id: 6,
    icon: BadgeCheck,
    text: 'Greenlight Planet NG achieved Verified Developer status',
    time: '3 days ago',
    borderClass: 'border-l-[#00A86B]',
    iconClass: 'bg-green-50 text-[#00A86B]',
  },
];

// ─── Quick Links ──────────────────────────────────────────────────────────────

const quickLinks: {
  label: string;
  description: string;
  href: Route;
  icon: React.ElementType;
}[] = [
  {
    label: 'Projects',
    description: 'Browse pre-screened energy projects seeking financing.',
    href: '/marketplace/projects',
    icon: FolderKanban,
  },
  {
    label: 'Developers',
    description: 'Explore developer profiles and project portfolios.',
    href: '/marketplace/developers',
    icon: Users,
  },
  {
    label: 'Financiers',
    description: 'Browse DFI and bank investment criteria.',
    href: '/marketplace/financiers',
    icon: Landmark,
  },
  {
    label: 'Analytics',
    description: 'Marketplace trends and investment insights.',
    href: '/marketplace/analytics',
    icon: TrendingUp,
  },
];

// ─── New Match Notification ───────────────────────────────────────────────────

function NewMatchNotification() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show after 3 seconds
    const showTimer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Auto-dismiss after 8 seconds
    const dismissTimer = setTimeout(() => setDismissed(true), 8000);
    return () => clearTimeout(dismissTimer);
  }, [visible]);

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 w-80"
      style={{
        animation: 'slideUpNotification 0.35s cubic-bezier(0.16, 1, 0.3, 1) both',
      }}
    >
      <style>{`
        @keyframes slideUpNotification {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes progressDrain {
          from { width: 100%; }
          to   { width: 0%;   }
        }
      `}</style>

      <div className="relative overflow-hidden rounded-xl border border-[#00A86B]/40 bg-[#0A2540] p-5 shadow-2xl">
        {/* Green pill */}
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#00A86B]/15 px-2.5 py-1">
          <span className="text-xs">🔔</span>
          <span className="text-xs font-semibold text-[#00A86B]">New Match</span>
        </div>

        {/* Close button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-white/10 hover:text-slate-200"
          aria-label="Dismiss notification"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Project name */}
        <p className="text-sm font-semibold text-white leading-snug">
          Enugu Industrial Solar Park
        </p>

        {/* Match name */}
        <p className="mt-0.5 text-xs text-slate-400">
          Matched with{' '}
          <span className="font-medium text-slate-200">Africa Finance Corporation</span>
        </p>

        {/* Match score */}
        <p
          className="mt-2 text-sm font-semibold"
          style={{ color: '#00A86B', fontFamily: 'IBM Plex Mono, monospace' }}
        >
          82% compatibility
        </p>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <Link
            href={'/marketplace/matching' as Route}
            className="flex-1 rounded-lg bg-[#00A86B] px-3 py-2 text-center text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            View Match
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="flex-1 rounded-lg border border-slate-600 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-slate-100"
          >
            Dismiss
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
          <div
            className="h-full bg-[#00A86B]"
            style={{
              animation: 'progressDrain 8s linear both',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MarketplaceOverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="SEF-DP Marketplace"
        description="Connect developers with financiers — pre-screened projects, credit-scored and ready for investment."
      />

      {/* Stat Cards with Sparklines */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const sparkData = card.sparkline.map((v, i) => ({ i, v }));
          return (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">{card.title}</p>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A2540]/10">
                  <Icon className="h-4 w-4 text-[#0A2540]" />
                </div>
              </div>
              <p className="mt-2 font-display text-3xl font-bold tracking-tight text-[#0A2540]">
                {card.value}
              </p>
              <p className="mt-1 text-xs font-medium text-[#00A86B]">{card.delta}</p>
              <div className="mt-3 h-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkData}>
                    <Line
                      type="monotone"
                      dataKey="v"
                      stroke="#00A86B"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map(({ label, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-[#0A2540]/30 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0A2540]/10">
              <Icon className="h-5 w-5 text-[#0A2540]" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[#0A2540]">{label}</p>
              <p className="mt-0.5 text-sm text-slate-500">{description}</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 self-center text-slate-400 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-base font-semibold text-[#0A2540]">
          Recent Marketplace Activity
        </h2>
        <div className="space-y-3">
          {activityFeed.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`flex items-start gap-3 rounded-lg border-l-4 bg-slate-50 px-4 py-3 ${item.borderClass}`}
              >
                <div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-[#0F172A]">{item.text}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{item.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating new-match notification */}
      <NewMatchNotification />
    </div>
  );
}
