import { Settings, Plus } from 'lucide-react';
import { Button } from '@sefdp/ui';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function AdminProgramsPage() {
  return (
    <div>
      <PageHeader
        title="Programs Management"
        description="Configure and manage DARES programs and their parameters."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Program
          </Button>
        }
      />

      <EmptyState
        icon={Settings}
        title="No programs configured"
        description="Create a program to define disbursement rules, eligibility criteria, and funding parameters."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Program
          </Button>
        }
      />
    </div>
  );
}
