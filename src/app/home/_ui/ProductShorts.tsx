"use client";

import { Masonry } from "react-plock";

import {
  PRODUCT_SHORTS_DUMMY,
  PRODUCT_SHORTS_MASONRY_CONFIG,
} from "@/app/home/_model";
import { TitleSectionSheet } from "@/shared/ui/sheets";

import { ProductShortsCard } from "./ProductShortsCard";

/**
 * 제품 쇼츠 영역
 * 세로 비율이 제각각인 숏폼 썸네일을 반응형 메이슨리로 배치
 */
export function ProductShorts() {
  const title = `📷 인플루언서들이 추천한 그 상품`;

  return (
    <TitleSectionSheet variant={"transparent"} title={title}>
      <Masonry
        items={PRODUCT_SHORTS_DUMMY}
        config={PRODUCT_SHORTS_MASONRY_CONFIG}
        render={(item) => <ProductShortsCard key={item.id} item={item} />}
      />
    </TitleSectionSheet>
  );
}
