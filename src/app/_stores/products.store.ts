import type { StoreApi } from "zustand";
import { createStore } from "zustand/vanilla";

import {
  type Product,
  PURCHASE_RANKING_DUMMY_PRODUCTS,
} from "@/app/search/_model";

export interface ProductsState {
  /** 실시간 구매 랭킹 화면에 노출할 상품 목록 */
  purchaseRankingProducts: Product[];
}

export interface ProductsActions {
  /** 실시간 구매 랭킹 상품 목록 교체 */
  setPurchaseRankingProducts: (products: Product[]) => void;

  /** 실시간 구매 랭킹 상품 목록 초기화 */
  clearPurchaseRankingProducts: () => void;
}

export type ProductsStore = ProductsState & ProductsActions;
export type ProductsStoreApi = StoreApi<ProductsStore>;

/**
 * products 스토어 기본값
 */
export const initProductsStore = (): ProductsState => ({
  // TODO: API 연동 시 빈 배열로 되돌리고 더미 데이터 제거
  purchaseRankingProducts: PURCHASE_RANKING_DUMMY_PRODUCTS,
});

/**
 * products 스토어 인스턴스 생성
 */
export const createProductsStore = (
  initState: ProductsState = initProductsStore(),
): ProductsStoreApi =>
  createStore<ProductsStore>()((set) => ({
    ...initState,

    setPurchaseRankingProducts: (products) =>
      set({ purchaseRankingProducts: products }),

    clearPurchaseRankingProducts: () => set(initProductsStore()),
  }));
