export default function OfferLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-[var(--color-ivory)]">{children}</main>;
}
