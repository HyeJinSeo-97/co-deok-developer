import type {
  HeroBannerItem,
  ProductShortsItem,
  ProductShortsMasonryConfig,
} from "./types";

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

/** 제품 쇼츠 썸네일 가로 크기 (px) — 모든 쇼츠가 동일 */
export const PRODUCT_SHORTS_IMAGE_WIDTH = 360;

/**
 * 제품 쇼츠 세로 비율 목록
 * 전부 세로(portrait) 비율이되 높이가 서로 달라야 메이슨리가 의미를 가짐
 */
const PRODUCT_SHORTS_RATIOS = {
  /** 9:16 — 가장 긴 숏폼 비율 */
  tall: 640,
  /** 3:4 */
  medium: 480,
  /** 4:5 */
  short: 450,
} as const;

/**
 * picsum.photos 더미 썸네일 URL 생성
 * next.config.ts 의 remotePatterns 가 `/id/**` 만 허용하므로 반드시 id 경로를 사용
 * @param imageId picsum 이미지 id
 * @param height 썸네일 세로 크기 (px)
 * @return 세로 비율 썸네일 이미지 URL
 */
const createProductShortsImageUrl = (imageId: number, height: number): string =>
  `https://picsum.photos/id/${imageId}/${PRODUCT_SHORTS_IMAGE_WIDTH}/${height}`;

/** 제품 쇼츠 더미 데이터 (추후 서버 데이터로 교체) */
export const PRODUCT_SHORTS_DUMMY: ProductShortsItem[] = [
  {
    id: "product-shorts-1",
    title: "이 토너 하나로 속건조 끝내는 법",
    influencer: "뷰티덕후 지은",
    viewCount: 128000,
    thumbnail: createProductShortsImageUrl(1080, PRODUCT_SHORTS_RATIOS.tall),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.tall,
  },
  {
    id: "product-shorts-2",
    title: "세럼 바르는 순서만 바꿔도 달라져요",
    influencer: "스킨케어 민",
    viewCount: 94300,
    thumbnail: createProductShortsImageUrl(1084, PRODUCT_SHORTS_RATIOS.medium),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.medium,
  },
  {
    id: "product-shorts-3",
    title: "클렌징 오일 제대로 쓰는 3단계",
    influencer: "코덕 라이프",
    viewCount: 51200,
    thumbnail: createProductShortsImageUrl(1074, PRODUCT_SHORTS_RATIOS.short),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.short,
  },
  {
    id: "product-shorts-4",
    title: "탄력 크림 한 달 사용 후기",
    influencer: "데일리 수현",
    viewCount: 233000,
    thumbnail: createProductShortsImageUrl(1069, PRODUCT_SHORTS_RATIOS.tall),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.tall,
  },
  {
    id: "product-shorts-12",
    title: "쿠션 팁 두드리는 순간 움짤",
    influencer: "베이스 연구소",
    viewCount: 66200,
    thumbnail:
      "https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3M21lMm4wM3Uxand5aHNsZHM0NXRpcjZyeGkybXllNGd1Mmg5bmUwZSZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/79HvRGLxVdl9rVOBtO/giphy.gif",
    thumbnailWidth: 480,
    thumbnailHeight: 480,
    isAnimated: true,
  },
  {
    id: "product-shorts-5",
    title: "여름 선크림 백탁 없는 제품 비교",
    influencer: "썬케어 연구소",
    viewCount: 76500,
    thumbnail: createProductShortsImageUrl(1062, PRODUCT_SHORTS_RATIOS.medium),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.medium,
  },
  {
    id: "product-shorts-6",
    title: "마스크팩 10매 전부 써봤습니다",
    influencer: "팩덕 하루",
    viewCount: 41800,
    thumbnail: createProductShortsImageUrl(1059, PRODUCT_SHORTS_RATIOS.short),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.short,
  },
  {
    id: "product-shorts-7",
    title: "립 제품 발색 비교 한 번에",
    influencer: "립덕 서아",
    viewCount: 187000,
    thumbnail: createProductShortsImageUrl(1027, PRODUCT_SHORTS_RATIOS.tall),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.tall,
  },
  {
    id: "product-shorts-8",
    title: "속눈썹 오래 유지되는 마스카라",
    influencer: "메이크업 다은",
    viewCount: 63400,
    thumbnail: createProductShortsImageUrl(1005, PRODUCT_SHORTS_RATIOS.medium),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.medium,
  },
  {
    id: "product-shorts-9",
    title: "향수 레이어링 초보 가이드",
    influencer: "향덕 노트",
    viewCount: 29700,
    thumbnail: createProductShortsImageUrl(1011, PRODUCT_SHORTS_RATIOS.short),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.short,
  },
  {
    id: "product-shorts-10",
    title: "헤어 에센스 밤에 바르면 생기는 일",
    influencer: "헤어케어 유진",
    viewCount: 112000,
    thumbnail: createProductShortsImageUrl(1013, PRODUCT_SHORTS_RATIOS.tall),
    thumbnailWidth: PRODUCT_SHORTS_IMAGE_WIDTH,
    thumbnailHeight: PRODUCT_SHORTS_RATIOS.tall,
  },
  {
    id: "product-shorts-11",
    title: "발색 순간만 모아본 움짤",
    influencer: "코덕 모먼트",
    viewCount: 84500,
    thumbnail:
      "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2prZDJ3OWtkY2Y5eHpubmtqcGV3bThmOW91dTQ0bXV5amp0bGNkNiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/7Toe8aVEdeEazq5VcP/giphy.gif",
    thumbnailWidth: 320,
    thumbnailHeight: 480,
    isAnimated: true,
  },
];

/**
 * 제품 쇼츠 메이슨리 반응형 설정
 * react-plock 은 "매칭된 media 개수"를 columns · gap 의 인덱스로 사용하고
 * media.length - 1 로 클램프한다. 따라서 단계가 N개면
 * columns · gap 은 N개, media 는 N개의 오름차순 min-width 여야 하며
 * 아무것도 매칭되지 않는 최소 화면이 인덱스 0 을 쓴다.
 * (마지막 값은 클램프 때문에 실제로는 도달만 시켜주는 역할)
 */
export const PRODUCT_SHORTS_MASONRY_CONFIG: ProductShortsMasonryConfig = {
  /** 모바일 2 → 태블릿 3 → 데스크톱 4 → 와이드 5 */
  columns: [2, 3, 4, 5],
  gap: [8, 12, 16, 16],
  media: [640, 1024, 1280, 1536],
};

/** 제품 쇼츠 썸네일 sizes 속성 — 메이슨리 컬럼 수 변화에 맞춘 뷰포트 비율 */
export const PRODUCT_SHORTS_IMAGE_SIZES =
  "(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw";
