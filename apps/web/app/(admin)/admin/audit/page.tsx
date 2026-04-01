import { ScrollText } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function AdminAuditPage() {
  return (
    <div>
      <PageHeader
        title="Audit Log"
        description="View a chronological record of all administrative actions and system events."
      />

      <EmptyState
        icon={ScrollText}
        title="No audit entries yet"
        description="Audit log entries will appear here as users perform actions across the platform."
      />
    </div>
  );
}
