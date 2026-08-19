interface HomeRootLayoutProps {
  header: React.ReactNode;

  children: React.ReactNode;
}

export default function SearchRootLayout({
  header,
  children,
}: HomeRootLayoutProps) {
  return (
    <>
      {header}
      {children}
    </>
  );
}
