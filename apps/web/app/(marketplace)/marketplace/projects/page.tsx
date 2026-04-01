import { FolderKanban, Plus } from 'lucide-react';
import { Button } from '@sefdp/ui';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function MarketplaceProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        description="Browse and manage sustainable energy project listings in the marketplace."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            List Project
          </Button>
        }
      />

      <EmptyState
        icon={FolderKanban}
        title="No projects listed"
        description="Sustainable energy projects will appear here once developers list them on the marketplace."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            List a Project
          </Button>
        }
      />
    </div>
  );
}
