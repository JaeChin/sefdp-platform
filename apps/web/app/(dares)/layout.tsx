import { DaresShell } from '@/components/dares/dares-shell';

export default function DaresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DaresShell>{children}</DaresShell>;
}
