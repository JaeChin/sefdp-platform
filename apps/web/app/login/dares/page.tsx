import Image from 'next/image'
import Link from 'next/link'
import type { Route } from 'next'

const demoLinks: { label: string; href: Route }[] = [
  { label: '→ Open as PMU Admin', href: '/dashboard' as Route },
  { label: '→ Open as World Bank Reviewer', href: '/dashboard' as Route },
  { label: '→ Open as Programme Officer', href: '/dashboard' as Route },
]

const trustBadges = [
  '✓ World Bank DARES Programme',
  '✓ Nigerian NDPA Compliant',
  '✓ Federal Ministry of Power',
]

export default function DaresLoginPage() {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-1/2 flex-col justify-center px-16 py-12 bg-background">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" aria-label="home" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight">SEF-DP</span>
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
          </Link>

          <p className="mt-12 text-sm font-medium uppercase tracking-widest text-emerald-500">
            DARES Programme Portal
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h1>

          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full h-11 rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                placeholder="••••••••"
              />
            </div>

            <div className="flex justify-end">
              <Link
                href={'/forgot-password' as Route}
                className="text-sm text-emerald-600 hover:text-emerald-700"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full h-11 rounded-full bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              Sign In
            </button>
          </form>

          <div className="mt-10">
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Demo Access
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              {demoLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <p className="mt-10 text-xs text-muted-foreground text-center">
            Access restricted to authorised DARES programme participants.
          </p>
        </div>
      </div>

      <div className="relative w-1/2">
        <Image
          src="/images/image23.jpg"
          alt="Rooftop solar installation at sunset"
          fill
          className="object-cover object-center"
          sizes="50vw"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-8 left-8 right-8">
          <p className="text-white text-xl font-semibold leading-snug mb-4">
            Managing Nigeria&apos;s $750M clean energy transition.
          </p>
          <div className="flex flex-wrap">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur-sm px-3 py-1 text-xs text-white mr-2 mb-2"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
