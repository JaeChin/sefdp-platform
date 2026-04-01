import { ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function AdminScoringPage() {
  return (
    <div>
      <PageHeader
        title="Scoring Configuration"
        description="Configure scoring models, weights, and criteria used to evaluate projects and applications."
      />

      <EmptyState
        icon={ShieldCheck}
        title="No scoring models configured"
        description="Define scoring models to automatically evaluate project applications against your program criteria."
      />
    </div>
  );
}
