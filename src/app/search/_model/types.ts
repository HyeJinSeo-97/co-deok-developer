export type SearchQuery = {
  id: string;

  query: string;
};

/** 실시간 구매 랭킹 상품 */
export type Product = {
  id: string;

  /** 상품명 */
  name: string;

  /** 정가 (할인 전 가격) */
  originalPrice: number;

  /** 할인율 (%) */
  discountPercentage: number;

  /** 최종 판매가 (할인 적용가) */
  price: number;

  /** 실시간 구매 랭킹 순위 (1부터 시작) */
  rank: number;

  /** 제품 썸네일 이미지 */
  thumbnail: string;
};
