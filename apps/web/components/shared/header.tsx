'use client';

import { LogOut, User } from 'lucide-react';
import { Button } from '@sefdp/ui';

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-6">
      <div className="text-sm font-medium text-muted-foreground">
        Sustainable Energy Finance Developer Platform
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">User</span>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
