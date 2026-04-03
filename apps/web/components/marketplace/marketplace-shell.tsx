'use client';

import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Landmark,
  GitCompare,
  TrendingUp,
} from 'lucide-react';
import { Sidebar, type NavItem } from '@/components/shared/sidebar';
import { Header } from '@/components/shared/header';

const marketplaceNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Overview', href: '/marketplace/overview' },
  { icon: FolderKanban, label: 'Projects', href: '/marketplace/projects' },
  { icon: Users, label: 'Developers', href: '/marketplace/developers' },
  { icon: Landmark, label: 'Financiers', href: '/marketplace/financiers' },
  { icon: GitCompare, label: 'Matching', href: '/marketplace/matching' },
  { icon: TrendingUp, label: 'Analytics', href: '/marketplace/analytics' },
];

export function MarketplaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={marketplaceNavItems} title="Marketplace" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header userName="Marketplace User" roleBadge="Financier Portal">
            {/* TODO: replace span + dot with <Image> src="/logos/seforall.svg" when asset arrives */}
            <div className="flex items-center gap-1.5 border border-slate-600 rounded px-2 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] shrink-0" />
              <span className="text-xs text-slate-400 whitespace-nowrap">SEforALL Partner Platform</span>
            </div>
          </Header>
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>

      {/* CBN compliance strip */}
      <div className="border-t border-slate-200 bg-slate-50 py-2.5 px-6 flex items-center justify-between shrink-0">
        <span className="text-xs text-slate-500">
          Regulated under the oversight of the{' '}
          <span className="font-semibold text-slate-700">Central Bank of Nigeria</span>
        </span>
        {/* TODO: replace text with <Image> src="/logos/cbn.svg" when asset arrives */}
        <span className="text-xs text-slate-400 font-mono tracking-wide">CBN · In Partnership</span>
      </div>
    </div>
  );
}
