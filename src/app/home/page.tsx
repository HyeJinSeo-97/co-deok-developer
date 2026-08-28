import {
  HeroBanner,
  ProductShorts,
  QuickMenus,
  SajuRecommendButton,
  SecretSaleProduct,
} from "./_ui";

export default function HomeRootPage() {
  return (
    <div className={"space-y-8"}>
      <HeroBanner />
      <QuickMenus />
      <SajuRecommendButton />
      <SecretSaleProduct />
      <ProductShorts />
    </div>
  );
}
