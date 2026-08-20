export function ResponsiveLayout({ children }: { children: React.ReactNode }) {
  // 자식(헤더 + ContentLayout)이 세로로 쌓이며 높이를 나눠 갖도록 flex-col
  return (
    <div className="mx-auto flex h-full w-full max-w-5xl flex-col">
      {children}
    </div>
  );
}
