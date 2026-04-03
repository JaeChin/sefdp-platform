'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import type { Route } from 'next';
import { cn } from '@sefdp/ui';

export interface NavItem {
  icon: LucideIcon;
  label: string;
  href: Route;
}

interface SidebarProps {
  items: NavItem[];
  title: string;
  footer?: React.ReactNode;
}

export function Sidebar({ items, title, footer }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col bg-slate-50 border-r border-slate-200">
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <Link href="/marketplace/landing" className="text-lg font-bold text-[#0A2540]">
          SEF-DP
        </Link>
        <span className="ml-2 rounded bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600">
          {title}
        </span>
      </div>

      <nav className="flex-1 flex flex-col px-3 py-4">
        <div className="space-y-1 flex-1">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[#0A2540] text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
        {footer}
      </nav>
    </aside>
  );
}
