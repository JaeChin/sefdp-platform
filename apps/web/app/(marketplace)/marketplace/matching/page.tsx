import { GitCompare } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function MatchingPage() {
  return (
    <div>
      <PageHeader
        title="Matching"
        description="View and manage matches between developers and financiers based on project criteria."
      />

      <EmptyState
        icon={GitCompare}
        title="No matches yet"
        description="The matching engine will suggest developer-financier pairings once sufficient profiles and projects are available."
      />
    </div>
  );
}
