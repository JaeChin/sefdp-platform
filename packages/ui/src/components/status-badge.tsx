import * as React from 'react';

import { cn } from '../utils';

const STATUS_COLORS: Record<string, string> = {
  approved: 'bg-success-50 text-success-700 border-success-500/20',
  active: 'bg-success-50 text-success-700 border-success-500/20',
  completed: 'bg-success-50 text-success-700 border-success-500/20',
  verified: 'bg-success-50 text-success-700 border-success-500/20',
  disbursed: 'bg-success-50 text-success-700 border-success-500/20',
  closed: 'bg-success-50 text-success-700 border-success-500/20',

  pending: 'bg-warning-50 text-warning-700 border-warning-500/20',
  in_progress: 'bg-warning-50 text-warning-700 border-warning-500/20',
  processing: 'bg-warning-50 text-warning-700 border-warning-500/20',
  disbursement_pending: 'bg-warning-50 text-warning-700 border-warning-500/20',
  revision_requested: 'bg-warning-50 text-warning-700 border-warning-500/20',

  rejected: 'bg-danger-50 text-danger-700 border-danger-500/20',
  failed: 'bg-danger-50 text-danger-700 border-danger-500/20',
  reversed: 'bg-danger-50 text-danger-700 border-danger-500/20',
  overdue: 'bg-danger-50 text-danger-700 border-danger-500/20',
  suspended: 'bg-danger-50 text-danger-700 border-danger-500/20',
  declined: 'bg-danger-50 text-danger-700 border-danger-500/20',
  decommissioned: 'bg-danger-50 text-danger-700 border-danger-500/20',

  submitted: 'bg-blue-50 text-blue-700 border-blue-500/20',
  under_review: 'bg-blue-50 text-blue-700 border-blue-500/20',
  interested: 'bg-blue-50 text-blue-700 border-blue-500/20',
  in_discussion: 'bg-blue-50 text-blue-700 border-blue-500/20',
  term_sheet: 'bg-blue-50 text-blue-700 border-blue-500/20',

  draft: 'bg-gray-50 text-gray-700 border-gray-500/20',
  suggested: 'bg-gray-50 text-gray-700 border-gray-500/20',
  viewed: 'bg-gray-50 text-gray-700 border-gray-500/20',
};

function formatStatusLabel(status: string): string {
  return status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: string;
}

function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const colorClasses = STATUS_COLORS[status] ?? 'bg-gray-50 text-gray-700 border-gray-500/20';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
        colorClasses,
        className,
      )}
      {...props}
    >
      {formatStatusLabel(status)}
    </span>
  );
}

export { StatusBadge };
