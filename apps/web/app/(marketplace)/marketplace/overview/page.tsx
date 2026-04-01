import {
  FolderKanban,
  Users,
  Landmark,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { PageHeader } from '@/components/shared/page-header';
import { StatCard } from '@/components/shared/stat-card';

const quickLinks: { label: string; description: string; href: string; icon: React.ElementType }[] =
  [
    {
      label: 'Projects',
      description: 'Browse pre-screened energy projects seeking financing.',
      href: '/marketplace/projects',
      icon: FolderKanban,
    },
    {
      label: 'Developers',
      description: 'Explore developer profiles and project portfolios.',
      href: '/marketplace/developers',
      icon: Users,
    },
    {
      label: 'Financiers',
      description: 'Browse DFI and bank investment criteria.',
      href: '/marketplace/financiers',
      icon: Landmark,
    },
    {
      label: 'Analytics',
      description: 'Marketplace trends and investment insights.',
      href: '/marketplace/analytics',
      icon: TrendingUp,
    },
  ];

export default function MarketplaceOverviewPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="SEF-DP Marketplace"
        description="Connect developers with financiers — IFC-screened projects, credit-scored and ready for investment."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Listed Projects" value={42} change="+6" icon={FolderKanban} />
        <StatCard title="Registered Developers" value={18} change="+3" icon={Users} />
        <StatCard title="Active Financiers" value={9} change="+1" icon={Landmark} />
        <StatCard title="Matches Made" value={31} change="+12%" icon={TrendingUp} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {quickLinks.map(({ label, description, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-[#0A2540]">{label}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 shrink-0 self-center text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-base font-semibold text-[#0A2540]">Recent Marketplace Activity</h2>
        <p className="text-sm text-muted-foreground">
          Recent matches, project listings, and financing activity will appear here once data is connected.
        </p>
      </div>
    </div>
  );
}
