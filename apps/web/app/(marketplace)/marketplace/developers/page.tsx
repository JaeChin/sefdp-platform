import { Users } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function DevelopersPage() {
  return (
    <div>
      <PageHeader
        title="Developers"
        description="Browse developer profiles and their sustainable energy project portfolios."
      />

      <EmptyState
        icon={Users}
        title="No developer profiles yet"
        description="Developer profiles will appear here once organizations register and complete their profiles."
      />
    </div>
  );
}
