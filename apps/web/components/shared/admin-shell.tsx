'use client';

import { Users, Settings, ShieldCheck, ScrollText } from 'lucide-react';
import { Sidebar, type NavItem } from '@/components/shared/sidebar';
import { Header } from '@/components/shared/header';

const adminNavItems: NavItem[] = [
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Settings, label: 'Programs', href: '/admin/programs' },
  { icon: ShieldCheck, label: 'Scoring', href: '/admin/scoring' },
  { icon: ScrollText, label: 'Audit', href: '/admin/audit' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar items={adminNavItems} title="Admin" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
