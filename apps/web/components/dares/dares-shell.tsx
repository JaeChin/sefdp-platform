'use client';

import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Milestone,
  Receipt,
  Activity,
  BarChart3,
} from 'lucide-react';
import { Sidebar, type NavItem } from '@/components/shared/sidebar';
import { Header } from '@/components/shared/header';

const daresNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderKanban, label: 'Projects', href: '/projects' },
  { icon: FileText, label: 'Applications', href: '/applications' },
  { icon: Milestone, label: 'Milestones', href: '/milestones' },
  { icon: Receipt, label: 'Claims', href: '/claims' },
  { icon: Activity, label: 'Monitoring', href: '/monitoring' },
  { icon: BarChart3, label: 'Reports', href: '/reports' },
];

export function DaresShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar items={daresNavItems} title="DARES" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header userName="PMU Administrator" roleBadge="World Bank · DARES" />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
