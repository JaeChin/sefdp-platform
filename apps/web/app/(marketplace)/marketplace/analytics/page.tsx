import { TrendingUp } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Marketplace analytics — trends, performance metrics, and investment insights."
      />

      <EmptyState
        icon={TrendingUp}
        title="No analytics data yet"
        description="Charts and insights will populate once there is marketplace activity to analyze."
      />
    </div>
  );
}
