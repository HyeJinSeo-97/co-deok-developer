export function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto w-full max-w-5xl bg-white">{children}</div>;
}
