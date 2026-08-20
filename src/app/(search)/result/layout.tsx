import { ContentLayout } from "@/app/_layout/index";

interface SearchResultRootLayoutProps {
  header: React.ReactNode;

  children: React.ReactNode;
}

export default function SearchResultRootLayout({
  header,
  children,
}: SearchResultRootLayoutProps) {
  return (
    <>
      {header}

      <ContentLayout>{children}</ContentLayout>
    </>
  );
}
