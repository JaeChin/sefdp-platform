import { Activity } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function MonitoringPage() {
  return (
    <div>
      <PageHeader
        title="Monitoring"
        description="Monitor energy output, IoT data, and compliance metrics across active projects."
      />

      <EmptyState
        icon={Activity}
        title="No monitoring data yet"
        description="Real-time monitoring feeds and compliance dashboards will appear here once projects are connected."
      />
    </div>
  );
}
