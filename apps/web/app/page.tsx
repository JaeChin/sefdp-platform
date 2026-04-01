import Link from 'next/link';
import { ArrowRight, Zap, Store } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium text-muted-foreground">
          Sustainable Energy Finance
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          SEF-DP
        </h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Developer Platform for sustainable energy finance — manage DARES
          disbursements and connect through the Marketplace.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/dashboard"
            className="group relative flex flex-col items-start rounded-xl border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Zap className="h-6 w-6" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">DARES</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Disbursement Application Review &amp; Execution System — manage
              projects, claims, milestones, and monitoring.
            </p>
            <span className="mt-auto inline-flex items-center text-sm font-medium text-primary">
              Open Dashboard
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>

          <Link
            href="/marketplace/overview"
            className="group relative flex flex-col items-start rounded-xl border bg-card p-6 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Store className="h-6 w-6" />
            </div>
            <h2 className="mb-2 text-xl font-semibold">Marketplace</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Connect developers with financiers — browse projects, match
              profiles, and access analytics.
            </p>
            <span className="mt-auto inline-flex items-center text-sm font-medium text-primary">
              Open Dashboard
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
