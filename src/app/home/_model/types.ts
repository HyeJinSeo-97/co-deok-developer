/** 히어로 배너 단일 항목 */
export interface HeroBannerItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
}

/** 제품 쇼츠 단일 항목 */
export interface ProductShortsItem {
  /** 쇼츠 식별자 */
  id: string;
  /** 쇼츠 제목 */
  title: string;
  /** 추천한 인플루언서 이름 */
  influencer: string;
  /** 조회수 (회) */
  viewCount: number;
  /** 썸네일 이미지 URL */
  thumbnail: string;
  /** 썸네일 가로 크기 (px) */
  thumbnailWidth: number;
  /** 썸네일 세로 크기 (px) */
  thumbnailHeight: number;
  /** 움짤(GIF) 여부 — true 면 Next 이미지 최적화를 건너뛰어 애니메이션 유지 */
  isAnimated?: boolean;
}

/** 제품 쇼츠 메이슨리 반응형 설정 (react-plock config 형태) */
export interface ProductShortsMasonryConfig {
  /** 단계별 컬럼 수 */
  columns: number[];
  /** 단계별 컬럼 간격 (px) */
  gap: number[];
  /** 단계별 min-width 기준점 (px, 오름차순) */
  media: number[];
}
