import { ProductsStoreProvider, SearchStoreProvider } from "@/app/_providers";

interface HomeRootLayoutProps {
  children: React.ReactNode;
}

export default function SearchGroupRootLayout({
  children,
}: HomeRootLayoutProps) {
  return (
    <SearchStoreProvider>
      <ProductsStoreProvider>{children}</ProductsStoreProvider>
    </SearchStoreProvider>
  );
}
