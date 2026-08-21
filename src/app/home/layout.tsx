import { BannerStoreProvider } from "@/app/_providers";
import { HERO_BANNER_DUMMY } from "@/app/home/_model";

interface HomeRootLayoutProps {
  header: React.ReactNode;

  children: React.ReactNode;
}

export default function HomeRootLayout({
  header,
  children,
}: HomeRootLayoutProps) {
  return (
    <BannerStoreProvider initialState={{ heroBanner: HERO_BANNER_DUMMY }}>
      {header}
      {children}
    </BannerStoreProvider>
  );
}
