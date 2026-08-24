import {
  HeroBanner,
  ProductShorts,
  QuickMenus,
  SecretSaleProduct,
} from "./_ui";

export default function HomeRootPage() {
  return (
    <div className={"space-y-8"}>
      <HeroBanner />
      <QuickMenus />
      <SecretSaleProduct />
      <ProductShorts />
    </div>
  );
}
