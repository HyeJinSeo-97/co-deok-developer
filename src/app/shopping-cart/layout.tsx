import { ContentLayout } from "@/app/_layout/index";

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
      <ContentLayout>{children}</ContentLayout>
    </>
  );
}
