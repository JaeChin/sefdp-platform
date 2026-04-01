import { FolderKanban, Plus } from 'lucide-react';
import { Button } from '@sefdp/ui';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function DaresProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Manage DARES energy projects and their disbursement pipelines."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        }
      />

      <EmptyState
        icon={FolderKanban}
        title="No projects yet"
        description="Create your first DARES project to begin tracking disbursements and milestones."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        }
      />
    </div>
  );
}
