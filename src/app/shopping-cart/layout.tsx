interface HomeRootLayoutProps {
  header: React.ReactNode;

  children: React.ReactNode;
}

export default function ShoppingCartRootLayout({
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
