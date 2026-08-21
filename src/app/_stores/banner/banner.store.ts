import type { StoreApi } from "zustand";
import { createStore } from "zustand/vanilla";

import type { HeroBannerItem } from "@/app/home/_model";

export interface BannerState {
  heroBanner: HeroBannerItem[];
}

export interface BannerActions {
  setHeroBanner: (heroBanner: HeroBannerItem[]) => void;
  reset: () => void;
}

export type BannerStore = BannerState & BannerActions;
export type BannerStoreApi = StoreApi<BannerStore>;

/**
 * banner 스토어 기본값
 * @return 배너 상태 초기값
 */
export const initBannerStore = (): BannerState => ({
  heroBanner: [],
});

/**
 * banner 스토어 인스턴스 생성
 * @param initState 초기 상태 (라우트에서 주입)
 * @return vanilla 스토어 인스턴스
 */
export const createBannerStore = (
  initState: BannerState = initBannerStore(),
): BannerStoreApi =>
  createStore<BannerStore>()((set) => ({
    ...initState,
    setHeroBanner: (heroBanner) => set({ heroBanner }),
    reset: () => set(initBannerStore()),
  }));
