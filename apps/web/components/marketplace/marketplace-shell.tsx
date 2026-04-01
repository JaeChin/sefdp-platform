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
    <div className="flex h-screen overflow-hidden">
      <Sidebar items={marketplaceNavItems} title="Marketplace" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
