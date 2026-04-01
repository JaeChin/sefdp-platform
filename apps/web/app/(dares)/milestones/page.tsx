import { Milestone } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function MilestonesPage() {
  return (
    <div>
      <PageHeader
        title="Milestones"
        description="Track project milestones and their verification status."
      />

      <EmptyState
        icon={Milestone}
        title="No milestones yet"
        description="Milestones will appear here as projects define their deliverable checkpoints."
      />
    </div>
  );
}
