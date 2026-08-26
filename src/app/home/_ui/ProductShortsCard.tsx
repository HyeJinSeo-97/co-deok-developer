import Image from "next/image";
import Link from "next/link";

import {
  PRODUCT_SHORTS_IMAGE_SIZES,
  type ProductShortsItem,
} from "@/app/home/_model";
import { formatViewCount } from "@/shared/lib";

/**
 * 움짤(GIF) 썸네일 강조용 액자 프레임
 * ring(box-shadow) 은 요소의 content 뒤에 그려져 이미지에 가려지므로,
 * 이미지 위에 얹는 별도 오버레이 레이어에 border 로 그린다.
 * inset-1 로 테두리에서 4px 안쪽에 띄워 액자처럼 보이게 함
 * ring-ring 은 포커스 링 전용 토큰이라 의미가 겹치므로 브랜드 토큰인 primary 사용
 */
const ANIMATED_FRAME_EFFECT =
  "pointer-events-none absolute inset-1 z-10 rounded-md border-2 border-white";

interface ProductShortsCardProps {
  item: ProductShortsItem;
}

/**
 * 쇼츠 카드 단일 항목
 * 썸네일은 원본 비율(세로)을 유지해 카드 높이가 서로 달라지도록 렌더
 */
export function ProductShortsCard({ item }: ProductShortsCardProps) {
  return (
    <Link href={"#"} className={"group block"}>
      <div
        className={
          "bg-muted relative overflow-hidden rounded-lg shadow-sm transition-shadow duration-300 group-hover:shadow-md"
        }
      >
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={item.thumbnailWidth}
          height={item.thumbnailHeight}
          sizes={PRODUCT_SHORTS_IMAGE_SIZES}
          unoptimized={item.isAnimated}
          className={
            "h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
          }
        />

        {item.isAnimated && <span className={ANIMATED_FRAME_EFFECT} />}
      </div>

      <p className={"text-body-sm mt-2 line-clamp-2 font-bold"}>{item.title}</p>

      <p className={"text-caption text-muted-foreground mt-0.5"}>
        {item.influencer} · {formatViewCount(item.viewCount)}
      </p>
    </Link>
  );
}
