# Landing Page Rebuild — DARES Only
# Execute these instructions exactly. Spin up subagents as needed for parallel work. Confirm no file overlaps before parallelising.

---

## CONTEXT

This is a Next.js 14 monorepo (Turborepo + pnpm). The web app lives at `apps/web/`.
The landing page at `apps/web/app/page.tsx` must be rebuilt to show DARES only.
No marketplace references, links, copy, or components anywhere on this page.
The `/marketplace/*` routes must remain untouched — do not delete or modify anything there.

---

## PHASE 1 — INSTALL DEPENDENCIES

Run these from inside `apps/web/`:

```bash
pnpm add motion framer-motion lucide-react
npx shadcn@latest add https://21st.dev/r/vaib215/shuffle-grid
npx shadcn@latest add https://21st.dev/r/kokonutd/bento-grid
npx shadcn@latest add https://21st.dev/r/meschacirung/features-1
npx shadcn@latest add https://21st.dev/r/meschacirung/hero-section-5
npx shadcn@latest add https://21st.dev/r/tailark/footer
```

After install, run:
```bash
find apps/web/components/ui -name "*.tsx" | sort
```
Note the exact paths of every installed component. Use those exact paths for imports — do NOT assume paths.

---

## PHASE 2 — REPLACE page.tsx

Replace `apps/web/app/page.tsx` entirely:

```tsx
import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { TrustBar } from "@/components/landing/trust-bar"
import { Stats } from "@/components/landing/stats"
import { DaresFeatures } from "@/components/landing/dares-features"
import { AboutProgramme } from "@/components/landing/about-programme"
import { CTASection } from "@/components/landing/cta-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustBar />
      <Stats />
      <DaresFeatures />
      <AboutProgramme />
      <CTASection />
      <Footer />
    </main>
  )
}
```

---

## PHASE 3 — CREATE COMPONENT FILES

Create the directory `apps/web/components/landing/` and add these files.
Use `framer-motion` imports consistently everywhere — do NOT use `motion/react`.

---

### apps/web/components/landing/navbar.tsx

```tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useScroll, motion } from 'framer-motion'

const menuItems = [
  { name: 'Platform', href: '#platform' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [menuState, setMenuState] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const { scrollYProgress } = useScroll()

  React.useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrolled(latest > 0.05)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <header>
      <nav data-state={menuState ? 'active' : undefined} className="group fixed z-20 w-full pt-2">
        <div className={cn(
          'mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12',
          scrolled && 'bg-background/50 backdrop-blur-2xl'
        )}>
          <div className={cn(
            'relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6',
            scrolled && 'lg:py-4'
          )}>
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <Link href="/" aria-label="home" className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight">SEF-DP</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link href={item.href} className="text-muted-foreground hover:text-accent-foreground block duration-150">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
```

---

### apps/web/components/landing/hero.tsx

Photos are already in `apps/web/public/images/`. Use these exact filenames. Each photo appears twice — the shuffle animation hides the repetition across 16 tiles.

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const heroPhotos = [
  '/images/image21.jpg',
  '/images/image28.jpg',
  '/images/image27.jpg',
  '/images/image38.jpg',
  '/images/image43.jpg',
  '/images/image23.jpg',
  '/images/image42.jpg',
  '/images/image39.jpg',
  '/images/image21.jpg',
  '/images/image28.jpg',
  '/images/image27.jpg',
  '/images/image38.jpg',
  '/images/image43.jpg',
  '/images/image23.jpg',
  '/images/image42.jpg',
  '/images/image39.jpg',
]

function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function generateSquares() {
  return shuffle(heroPhotos).map((src, i) => (
    <motion.div
      key={`${src}-${i}-${Math.random()}`}
      layout
      transition={{ duration: 1.5, type: 'spring' }}
      className="h-full w-full rounded-lg overflow-hidden"
    >
      <div className="relative h-full w-full">
        <Image
          src={src}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 25vw, 12vw"
        />
      </div>
    </motion.div>
  ))
}

function ShuffleGrid() {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [squares, setSquares] = useState(() => generateSquares())

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares())
      timeoutRef.current = setTimeout(shuffleSquares, 3000)
    }
    timeoutRef.current = setTimeout(shuffleSquares, 3000)
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-1.5 h-[450px]">
      {squares}
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-emerald-500">
              World Bank DARES Programme · Nigeria
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Powering Nigeria's
              <br />
              <span className="text-emerald-500">Clean Energy</span>
              {' '}Transition
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground">
              The digital backbone for the $750M DARES programme. Track project applications,
              verify claims, calculate disbursements, and report to stakeholders — all in one platform.
            </p>
            <div className="mt-10">
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-emerald-600 px-6 text-base font-medium text-white shadow-lg hover:bg-emerald-700 transition-colors"
              >
                Open DARES Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-sm text-muted-foreground">
                Access by invitation only. Platform in active development.
              </p>
            </div>
          </div>

          <div className="relative">
            <ShuffleGrid />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### apps/web/components/landing/trust-bar.tsx

Simple static version — no InfiniteSlider dependency. Can upgrade later when logo SVGs arrive.

```tsx
export function TrustBar() {
  const partners = [
    'World Bank Group',
    'DARES Programme',
    'Nigerian NDPA',
    'Federal Ministry of Power',
    'REA Nigeria',
    'SEforALL',
  ]

  return (
    <section className="border-t border-b bg-background py-4">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <p className="shrink-0 text-sm text-muted-foreground md:border-r md:pr-6">
            Programme partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
            {partners.map((p) => (
              <span key={p} className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

---

### apps/web/components/landing/stats.tsx

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 2000
    const startTime = Date.now()
    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const stats = [
  { value: 847, label: 'Active project applications', prefix: '', suffix: '' },
  { value: 750, label: 'Total programme value', prefix: '$', suffix: 'M' },
  { value: 6, label: 'Financing windows managed', prefix: '', suffix: '' },
]

export function Stats() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                <AnimatedNumber target={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### apps/web/components/landing/dares-features.tsx

After install, run `find apps/web/components/ui -name "*bento*"` and use that exact import path.
Check the real prop types of the installed BentoGrid component before writing items — adapt the items array to match the actual interface. Do NOT use type assertions.

```tsx
import { FileText, ShieldCheck, BarChart3, ScrollText } from 'lucide-react'
// TODO: replace this import with the actual installed path from the find command above
// import { BentoGrid } from '@/components/ui/bento-grid'

const daresItems = [
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
            Every tool a programme manager, developer, or oversight body needs — nothing they don't.
          </p>
        </div>
        {/* Wire up BentoGrid here after verifying import path and prop interface */}
      </div>
    </section>
  )
}
```

---

### apps/web/components/landing/about-programme.tsx

```tsx
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
```

---

### apps/web/components/landing/cta-section.tsx

```tsx
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
          Whether you're a solar developer, programme manager, or oversight body —
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
```

---

### apps/web/components/landing/footer.tsx

```tsx
import Link from 'next/link'

const footerLinks = {
  Platform: [
    { name: 'DARES Dashboard', href: '/dashboard' },
    { name: 'Project Applications', href: '#' },
    { name: 'Claims Verification', href: '#' },
    { name: 'KPI Reports', href: '#' },
  ],
  Programme: [
    { name: 'About DARES', href: '#about' },
    { name: 'Financing Windows', href: '#' },
    { name: 'Developer Guidelines', href: '#' },
    { name: 'World Bank Overview', href: '#' },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'NDPA Compliance', href: '#' },
    { name: 'Data Governance', href: '#' },
  ],
  Contact: [
    { name: 'Programme Office', href: '#contact' },
    { name: 'Technical Support', href: '#' },
    { name: 'Report an Issue', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-muted/30 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold tracking-tight">SEF-DP</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Sustainable Energy Finance Developer Platform
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Nigerian NDPA Compliant
              <br />
              World Bank DARES Programme
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 SEF-DP Platform · Built for Africa's energy transition
          </p>
          <p className="text-xs text-muted-foreground">
            SEF-DP v1.0-beta · All data subject to World Bank data governance policies
          </p>
        </div>
      </div>
    </footer>
  )
}
```

---

## PHASE 4 — VERIFY INSTALLED COMPONENTS & WIRE BENTO

1. Run `find apps/web/components/ui -name "*bento*"` — get the exact path
2. Open that file and read the exported component name and prop types
3. Update `dares-features.tsx` with the correct import and wire up `<BentoGrid items={daresItems} />` using the real prop interface
4. If the installed BentoGrid uses different prop names, rename the fields in `daresItems` to match — do not cast types

---

## PHASE 5 — TYPECHECK

Run from monorepo root:
```bash
pnpm typecheck
```

Fix every error. Rules:
- Do NOT use `any` or `@ts-ignore`
- Do NOT add `bg-white` to any root element (dark mode fix lives in globals.css)
- next/image `fill` requires parent to have `position: relative` and explicit dimensions — verify in hero.tsx and about-programme.tsx
- If motion.div in navbar causes type errors without animation props, replace with a plain `div`
- Do NOT touch anything under `apps/web/app/marketplace/`
- Do NOT commit or push

Re-run typecheck until output shows 0 errors.
