import Link from 'next/link'
import type { Route } from 'next'

const footerLinks: Record<string, { name: string; href: Route }[]> = {
  Platform: [
    { name: 'DARES Dashboard', href: '/dashboard' as Route },
    { name: 'Project Applications', href: '#' as Route },
    { name: 'Claims Verification', href: '#' as Route },
    { name: 'KPI Reports', href: '#' as Route },
  ],
  Programme: [
    { name: 'About DARES', href: '#about' as Route },
    { name: 'Financing Windows', href: '#' as Route },
    { name: 'Developer Guidelines', href: '#' as Route },
    { name: 'World Bank Overview', href: '#' as Route },
  ],
  Legal: [
    { name: 'Privacy Policy', href: '#' as Route },
    { name: 'Terms of Service', href: '#' as Route },
    { name: 'NDPA Compliance', href: '#' as Route },
    { name: 'Data Governance', href: '#' as Route },
  ],
  Contact: [
    { name: 'Programme Office', href: '#contact' as Route },
    { name: 'Technical Support', href: '#' as Route },
    { name: 'Report an Issue', href: '#' as Route },
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
            © 2026 SEF-DP Platform · Built for Africa&apos;s energy transition
          </p>
          <p className="text-xs text-muted-foreground">
            SEF-DP v1.0-beta · All data subject to World Bank data governance policies
          </p>
        </div>
      </div>
    </footer>
  )
}
