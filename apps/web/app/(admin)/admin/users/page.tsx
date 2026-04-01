import { Users, Plus } from 'lucide-react';
import { Button } from '@sefdp/ui';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';

export default function AdminUsersPage() {
  return (
    <div>
      <PageHeader
        title="User Management"
        description="Manage platform users, roles, and permissions."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        }
      />

      <EmptyState
        icon={Users}
        title="No users found"
        description="Platform users will appear here. Invite users to get started."
        action={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Invite User
          </Button>
        }
      />
    </div>
  );
}
