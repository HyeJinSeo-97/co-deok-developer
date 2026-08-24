import { HeroBanner, QuickMenus,SecretSaleProduct } from "./_ui";

export default function HomeRootPage() {
  return (
    <div className={"space-y-4"}>
      <HeroBanner />
      <QuickMenus />
      <SecretSaleProduct />
    </div>
  );
}
