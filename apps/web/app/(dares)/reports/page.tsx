import { BarChart3 } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function ReportsPage() {
  return (
    <div>
      <PageHeader
        title="Reports"
        description="Generate and view analytical reports on DARES program performance."
      />

      <EmptyState
        icon={BarChart3}
        title="No reports available"
        description="Reports will be generated once there is sufficient project and disbursement data."
      />
    </div>
  );
}
