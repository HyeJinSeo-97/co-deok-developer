import { ContentLayout } from "@/app/_layout/index";
import { ProductsStoreProvider, SearchStoreProvider } from "@/app/_providers";

interface HomeRootLayoutProps {
  header: React.ReactNode;

  children: React.ReactNode;
}

export default function SearchRootLayout({
  header,
  children,
}: HomeRootLayoutProps) {
  return (
    <SearchStoreProvider>
      <ProductsStoreProvider>
        {header}

        <ContentLayout>{children}</ContentLayout>
      </ProductsStoreProvider>
    </SearchStoreProvider>
  );
}
