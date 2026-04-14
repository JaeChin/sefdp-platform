import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 border-t">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to manage your DARES portfolio?
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Whether you&apos;re a solar developer, programme manager, or oversight body —
          SEF-DP gives you the tools to move faster with full transparency.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-600 px-8 text-base font-medium text-white shadow-lg hover:bg-emerald-700 transition-colors"
          >
            Request Access
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-12 items-center rounded-full border px-8 text-base font-medium text-foreground hover:bg-muted transition-colors"
          >
            Contact Programme Office
          </Link>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          DARES RFQ/2026/61763 · Nigerian NDPA Compliant · World Bank Data Governance
        </p>
      </div>
    </section>
  )
}
