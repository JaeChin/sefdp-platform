'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Landmark,
  GitCompare,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { Sidebar, type NavItem } from '@/components/shared/sidebar';
import { Header } from '@/components/shared/header';
import { getDemoRole, type DemoRole } from '@/lib/demo-role';

const marketplaceNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Overview', href: '/marketplace/overview' },
  { icon: FolderKanban, label: 'Projects', href: '/marketplace/projects' },
  { icon: Users, label: 'Developers', href: '/marketplace/developers' },
  { icon: Landmark, label: 'Financiers', href: '/marketplace/financiers' },
  { icon: GitCompare, label: 'Matching', href: '/marketplace/matching' },
  { icon: TrendingUp, label: 'Analytics', href: '/marketplace/analytics' },
];

function RegulatorLink() {
  const pathname = usePathname();
  const isActive = pathname === '/marketplace/regulator';
  return (
    <div>
      <div className="border-t border-slate-200 my-2" />
      <Link
        href="/marketplace/regulator"
        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
          isActive
            ? 'bg-amber-50 text-amber-800'
            : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
        <span>Regulator View</span>
      </Link>
    </div>
  );
}

export function MarketplaceShell({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<DemoRole>(null);

  useEffect(() => {
    setRole(getDemoRole());
  }, []);

  const filteredNavItems = marketplaceNavItems.filter((item) => {
    if (role === 'developer' && item.label === 'Developers') return false;
    if (role === 'financier' && item.label === 'Financiers') return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar items={filteredNavItems} title="Marketplace" logoHref="/marketplace/landing" footer={<RegulatorLink />} />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header userName="Marketplace User" roleBadge="Financier Portal">
            <div className="flex items-center gap-2.5">
              <span className="text-[11px] text-slate-500 whitespace-nowrap">In partnership with CBN</span>
              <span className="text-slate-600 text-xs select-none">|</span>
              {/* TODO: replace span + dot with <Image> src="/logos/seforall.svg" when asset arrives */}
              <div className="flex items-center gap-1.5 border border-slate-600 rounded px-2 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00A86B] shrink-0" />
                <span className="text-xs text-slate-400 whitespace-nowrap">SEforALL Partner Platform</span>
              </div>
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
