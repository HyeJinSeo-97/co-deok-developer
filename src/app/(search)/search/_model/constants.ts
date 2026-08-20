import type { Product } from "./types";

/**
 * 실시간 구매 랭킹 더미 데이터
 * API 연동 전까지 화면 확인용으로만 사용하며, 연동 시 제거
 */
export const PURCHASE_RANKING_DUMMY_PRODUCTS: Product[] = [
  {
    id: "product-1",
    name: "수분 진정 토너 300ml",
    originalPrice: 27500,
    discountPercentage: 20,
    price: 22000,
    rank: 1,
    thumbnail: `https://picsum.photos/id/10/200`,
  },
  {
    id: "product-2",
    name: "비타민C 브라이트닝 세럼",
    originalPrice: 50000,
    discountPercentage: 24,
    price: 38000,
    rank: 2,
    thumbnail: `https://picsum.photos/id/20/200`,
  },
  {
    id: "product-3",
    name: "무기자차 선크림 SPF50+",
    originalPrice: 30000,
    discountPercentage: 34,
    price: 19800,
    rank: 3,
    thumbnail: `https://picsum.photos/id/30/200`,
  },
  {
    id: "product-4",
    name: "세라마이드 수분 크림",
    originalPrice: 34700,
    discountPercentage: 15,
    price: 29500,
    rank: 4,
    thumbnail: `https://picsum.photos/id/40/200`,
  },
  {
    id: "product-5",
    name: "약산성 클렌징 폼",
    originalPrice: 21300,
    discountPercentage: 30,
    price: 14900,
    rank: 5,
    thumbnail: `https://picsum.photos/id/50/200`,
  },
];
