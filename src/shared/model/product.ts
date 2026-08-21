/** 비밀 할인 상품 단일 항목 */
export interface SecretSaleProductItem {
  /** 상품 식별자 */
  id: string;
  /** 상품명 */
  name: string;
  /** 할인 전 정가 (원) */
  originalPrice: number;
  /** 할인율 (%) */
  discountPercentage: number;
  /** 최종 할인가 (원) */
  price: number;
  /** 상품 썸네일 이미지 URL */
  thumbnail: string;
  /** 최저가 도전 상품 여부 */
  isLowestPriceChallenge: boolean;
}

/** 비밀 할인 상품 더미 목록 */
export const SECRET_SALE_PRODUCTS: readonly SecretSaleProductItem[] = [
  {
    id: "secret-sale-1",
    name: "수분 진정 토너 500ml 대용량",
    originalPrice: 28000,
    discountPercentage: 45,
    price: 15400,
    thumbnail: "https://picsum.photos/id/1080/400/400",
    isLowestPriceChallenge: true,
  },
  {
    id: "secret-sale-2",
    name: "비타민 브라이트닝 세럼 30ml",
    originalPrice: 42000,
    discountPercentage: 30,
    price: 29400,
    thumbnail: "https://picsum.photos/id/1084/400/400",
    isLowestPriceChallenge: false,
  },
  {
    id: "secret-sale-3",
    name: "저자극 클렌징 오일 200ml",
    originalPrice: 24000,
    discountPercentage: 25,
    price: 18000,
    thumbnail: "https://picsum.photos/id/1074/400/400",
    isLowestPriceChallenge: false,
  },
  {
    id: "secret-sale-4",
    name: "콜라겐 탄력 크림 50ml",
    originalPrice: 56000,
    discountPercentage: 50,
    price: 28000,
    thumbnail: "https://picsum.photos/id/1069/400/400",
    isLowestPriceChallenge: true,
  },
  {
    id: "secret-sale-5",
    name: "데일리 선크림 SPF50+ 70ml",
    originalPrice: 19000,
    discountPercentage: 20,
    price: 15200,
    thumbnail: "https://picsum.photos/id/1062/400/400",
    isLowestPriceChallenge: false,
  },
  {
    id: "secret-sale-6",
    name: "히알루론산 수분 마스크팩 10매",
    originalPrice: 15000,
    discountPercentage: 40,
    price: 9000,
    thumbnail: "https://picsum.photos/id/1059/400/400",
    isLowestPriceChallenge: true,
  },
  {
    id: "secret-sale-7",
    name: "약산성 아미노 클렌징 폼 150ml",
    originalPrice: 18000,
    discountPercentage: 35,
    price: 11700,
    thumbnail: "https://picsum.photos/id/1051/400/400",
    isLowestPriceChallenge: false,
  },
  {
    id: "secret-sale-8",
    name: "나이아신아마이드 잡티 앰플 20ml",
    originalPrice: 38000,
    discountPercentage: 55,
    price: 17100,
    thumbnail: "https://picsum.photos/id/1044/400/400",
    isLowestPriceChallenge: true,
  },
  {
    id: "secret-sale-9",
    name: "손상모 집중 헤어팩 250ml",
    originalPrice: 22000,
    discountPercentage: 30,
    price: 15400,
    thumbnail: "https://picsum.photos/id/1035/400/400",
    isLowestPriceChallenge: false,
  },
  {
    id: "secret-sale-10",
    name: "티트리 진정 스팟 젤 15ml",
    originalPrice: 16000,
    discountPercentage: 25,
    price: 12000,
    thumbnail: "https://picsum.photos/id/1027/400/400",
    isLowestPriceChallenge: false,
  },
] as const;
