import Image from "next/image";
import Link from "next/link";

import { cn } from "@/shared/lib/utils";
import { SECRET_SALE_PRODUCTS } from "@/shared/model";
import { Item, ItemContent, ItemMedia } from "@/shared/shadcn/item";
import { ScrollArea, ScrollBar } from "@/shared/shadcn/scroll-area";
import { TitleSectionSheet } from "@/shared/ui/sheets";

/** 썸네일 한 변 크기 (px) */
const THUMBNAIL_SIZE = 56;

/** 가격을 원화 표기로 변환 */
const formatPrice = (price: number): string => `${price.toLocaleString()}원`;

/**
 * 비밀 할인 상품 영역
 * 2줄 고정 그리드를 열 방향으로 채워 가로 스크롤로 노출
 */
export function SecretSaleProduct() {
  const title = `🤫 쉿! 우리만 아는 할인 상품`;

  return (
    <TitleSectionSheet variant={"transparent"} title={title}>
      <ScrollArea>
        <div className={"grid grid-flow-col grid-rows-3 gap-x-2"}>
          {SECRET_SALE_PRODUCTS.map((product) => (
            <Item
              key={product.id}
              render={<Link href={"#"} />}
              className={cn("relative w-72 flex-nowrap")}
            >
              <ItemMedia variant={"image"} className={"size-14"}>
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={THUMBNAIL_SIZE}
                  height={THUMBNAIL_SIZE}
                />
              </ItemMedia>

              <ItemContent>
                <p className={"text-caption line-clamp-2"}>{product.name}</p>

                <div className={"flex items-center gap-1.5"}>
                  <span className={"text-body font-extrabold text-primary"}>
                    {product.discountPercentage}%
                  </span>

                  <span className={"text-body font-extrabold"}>
                    {formatPrice(product.price)}
                  </span>

                  <span
                    className={
                      "text-caption text-muted-foreground line-through"
                    }
                  >
                    {formatPrice(product.originalPrice)}
                  </span>
                </div>
              </ItemContent>
            </Item>
          ))}
        </div>

        <ScrollBar orientation={"horizontal"} />
      </ScrollArea>
    </TitleSectionSheet>
  );
}
