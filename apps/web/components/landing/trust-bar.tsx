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
