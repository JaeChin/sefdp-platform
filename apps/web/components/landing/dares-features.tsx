import { FileText, ShieldCheck, BarChart3, ScrollText } from 'lucide-react'
import { BentoGrid, type BentoItem } from '@/components/ui/bento-grid'

const daresItems: BentoItem[] = [
  {
    title: 'Project Applications',
    meta: '847 active',
    description: 'End-to-end application tracking from submission through screening, approval, and disbursement.',
    icon: <FileText className="w-4 h-4 text-emerald-500" />,
    status: 'Live',
    tags: ['Applications', 'Tracking', 'Workflow'],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: 'Claims Verification',
    meta: 'Automated',
    description: 'PAYGO disbursement calculations with automated claims verification against programme milestones.',
    icon: <ShieldCheck className="w-4 h-4 text-sky-500" />,
    status: 'Active',
    tags: ['PAYGO', 'Verification'],
  },
  {
    title: 'KPI Dashboards',
    meta: 'Real-time',
    description: 'Live reporting dashboards for World Bank programme monitoring and stakeholder visibility.',
    icon: <BarChart3 className="w-4 h-4 text-amber-500" />,
    tags: ['Reporting', 'Analytics'],
    colSpan: 2,
  },
  {
    title: 'Audit Trail',
    meta: 'Every action logged',
    description: 'Complete audit trail for every disbursement decision, ensuring full transparency and compliance.',
    icon: <ScrollText className="w-4 h-4 text-purple-500" />,
    status: 'Active',
    tags: ['Compliance', 'Transparency'],
  },
]

export function DaresFeatures() {
  return (
    <section id="platform" className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built for the DARES programme
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Every tool a programme manager, developer, or oversight body needs — nothing they don&apos;t.
          </p>
        </div>
        <BentoGrid items={daresItems} />
      </div>
    </section>
  )
}
