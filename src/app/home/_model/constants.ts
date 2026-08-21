import type { HeroBannerItem } from "./types";

/** 히어로 배너 이미지 가로 크기 (px) */
export const HERO_BANNER_IMAGE_WIDTH = 1920;

/** 히어로 배너 이미지 세로 크기 (px) */
export const HERO_BANNER_IMAGE_HEIGHT = 1080;

/**
 * picsum.photos 더미 이미지 URL 생성
 * next.config.ts 의 remotePatterns 가 `/id/**` 만 허용하므로 반드시 id 경로를 사용
 * @param imageId picsum 이미지 id
 * @return 배너 크기에 맞춘 이미지 URL
 */
const createHeroBannerImageUrl = (imageId: number): string =>
  `https://picsum.photos/id/${imageId}/${HERO_BANNER_IMAGE_WIDTH}/${HERO_BANNER_IMAGE_HEIGHT}`;

/** 히어로 배너 더미 데이터 (추후 서버 데이터로 교체) */
export const HERO_BANNER_DUMMY: HeroBannerItem[] = [
  {
    id: "hero-banner-1",
    title: "이번 주 인기 굿즈",
    description: "덕질에 필요한 모든 것을 한 번에",
    imageUrl: createHeroBannerImageUrl(1015),
    imageAlt: "이번 주 인기 굿즈 배너",
    href: "/search?keyword=인기",
  },
  {
    id: "hero-banner-2",
    title: "신규 입고 알림",
    description: "새로 들어온 상품을 가장 먼저 만나보세요",
    imageUrl: createHeroBannerImageUrl(1025),
    imageAlt: "신규 입고 알림 배너",
    href: "/search?keyword=신규",
  },
  {
    id: "hero-banner-3",
    title: "한정판 컬렉션",
    description: "수량이 한정된 컬렉션을 놓치지 마세요",
    imageUrl: createHeroBannerImageUrl(1039),
    imageAlt: "한정판 컬렉션 배너",
    href: "/search?keyword=한정판",
  },
  {
    id: "hero-banner-4",
    title: "무료배송 기획전",
    description: "지금 담으면 배송비 0원",
    imageUrl: createHeroBannerImageUrl(1043),
    imageAlt: "무료배송 기획전 배너",
    href: "/search?keyword=무료배송",
  },
  {
    id: "hero-banner-5",
    title: "덕친 추천 상품",
    description: "같은 취향의 덕친들이 고른 상품",
    imageUrl: createHeroBannerImageUrl(1050),
    imageAlt: "덕친 추천 상품 배너",
    href: "/search?keyword=추천",
  },
];
