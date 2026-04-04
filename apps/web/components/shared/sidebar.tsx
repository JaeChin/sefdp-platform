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
  logoHref?: string;
  footer?: React.ReactNode;
}

export function Sidebar({ items, title, logoHref = '/', footer }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 items-center border-b px-6">
        <Link href={logoHref as Route} className="text-lg font-bold text-primary">
          SEF-DP
        </Link>
        <span className="ml-2 rounded bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
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
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
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
