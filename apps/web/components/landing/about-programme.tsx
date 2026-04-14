import Image from 'next/image'
import { Zap, Users, Globe } from 'lucide-react'

export function AboutProgramme() {
  return (
    <section id="about" className="py-20 border-t">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-500">
              About the Programme
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              A $750M initiative to scale clean energy across Nigeria
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The DARES programme is a World Bank initiative designed to accelerate distributed
              renewable energy access for millions of Nigerians. SEF-DP provides the digital
              infrastructure — managing applications, verifying claims, automating disbursements,
              and connecting every stakeholder in the energy access ecosystem.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <Zap className="h-5 w-5 text-emerald-500" />
                </div>
                <h3 className="font-semibold">Distributed Solar</h3>
                <p className="text-sm text-muted-foreground">Off-grid and mini-grid solar projects across all 6 geopolitical zones.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
                  <Users className="h-5 w-5 text-sky-500" />
                </div>
                <h3 className="font-semibold">Verified Developers</h3>
                <p className="text-sm text-muted-foreground">Pre-screened developers with audited technical and financial records.</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                  <Globe className="h-5 w-5 text-amber-500" />
                </div>
                <h3 className="font-semibold">NDPA Compliant</h3>
                <p className="text-sm text-muted-foreground">Full Nigerian Data Protection Act compliance with local data residency.</p>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src="/images/image28.jpg"
              alt="DARES programme field engineer on rooftop solar installation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
