export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            SEF-DP
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sustainable Energy Finance Developer Platform
          </p>
        </div>
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}
