import type { LucideIcon } from 'lucide-react';
import { cn } from '@sefdp/ui';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  className,
}: StatCardProps) {
  const isPositive = change?.startsWith('+');

  return (
    <div
      className={cn(
        'rounded-xl border bg-card p-6 shadow-sm',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
      </div>
      <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
      {change && (
        <p
          className={cn(
            'mt-1 text-xs font-medium',
            isPositive ? 'text-green-600' : 'text-red-600',
          )}
        >
          {change} from last period
        </p>
      )}
    </div>
  );
}
