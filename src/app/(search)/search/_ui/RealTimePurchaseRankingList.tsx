"use client";

import Image from "next/image";
import Link from "next/link";

import { IconTrendingUp } from "@tabler/icons-react";

import { useProductsStore } from "@/app/_stores";
import type { Product } from "@/app/(search)/search/_model";
import { SalePrice } from "@/entities/product/ui";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/shadcn/item";
import { VerticalList, VerticalListItem } from "@/shared/ui/animation";

import { SearchItemTemplate } from "./SearchItemTemplate";

interface RealTimePurchaseRankingItemProps {
  product: Product;
}

function RealTimePurchaseRankingItem({
  product,
}: RealTimePurchaseRankingItemProps) {
  return (
    <Link href={"#"}>
      <Item>
        <ItemMedia variant={null} className={"w-5 h-10"}>
          <strong>{product.rank}</strong>
        </ItemMedia>

        <ItemMedia variant={"image"} className={"relative"}>
          <Image fill src={product.thumbnail} alt={`${product.name} 이미지`} />
        </ItemMedia>

        <ItemContent>
          <ItemTitle>{product.name}</ItemTitle>
          <SalePrice
            originalPrice={product.originalPrice}
            salePrice={product.price}
          />
        </ItemContent>
      </Item>
    </Link>
  );
}

export function RealTimePurchaseRankingList() {
  const products = useProductsStore((state) => state.purchaseRankingProducts);

  return (
    <SearchItemTemplate icon={IconTrendingUp} title={"실시간 구매 랭킹"}>
      <VerticalList>
        {products.map((product) => (
          <VerticalListItem key={product.id}>
            <RealTimePurchaseRankingItem product={product} />
          </VerticalListItem>
        ))}
      </VerticalList>
    </SearchItemTemplate>
  );
}
