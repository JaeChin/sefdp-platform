'use client';

import { LogOut, User } from 'lucide-react';
import { Button } from '@sefdp/ui';

interface HeaderProps {
  userName?: string;
  roleBadge?: string;
}

export function Header({ userName = 'User', roleBadge }: HeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="text-sm font-medium text-muted-foreground">
        Sustainable Energy Finance Developer Platform
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">{userName}</span>
          {roleBadge && (
            <span className="rounded bg-white/10 px-2 py-0.5 text-xs text-muted-foreground ring-1 ring-inset ring-slate-200">
              {roleBadge}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
