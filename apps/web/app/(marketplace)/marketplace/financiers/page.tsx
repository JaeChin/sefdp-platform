import { Landmark } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function FinanciersPage() {
  return (
    <div>
      <PageHeader
        title="Financiers"
        description="Browse financier profiles and their investment criteria for energy projects."
      />

      <EmptyState
        icon={Landmark}
        title="No financier profiles yet"
        description="Financier profiles will appear here once financial institutions register and publish their criteria."
      />
    </div>
  );
}
