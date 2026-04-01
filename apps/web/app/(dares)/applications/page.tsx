import { FileText, Plus } from 'lucide-react';
import { Button } from '@sefdp/ui';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function ApplicationsPage() {
  return (
    <div>
      <PageHeader
        title="Applications"
        description="Review and manage disbursement applications submitted by project developers."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Application
          </Button>
        }
      />

      <EmptyState
        icon={FileText}
        title="No applications yet"
        description="Disbursement applications will appear here once projects submit them for review."
      />
    </div>
  );
}
