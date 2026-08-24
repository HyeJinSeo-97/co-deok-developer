"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";

import type { BannerStore, BannerStoreApi } from "./banner.store";

export const BannerStoreContext = createContext<BannerStoreApi | null>(null);

/**
 * banner 스토어 selector 훅
 * @param selector 구독할 상태를 고르는 selector
 * @return selector 가 반환한 값
 */
export const useBannerStore = <T>(selector: (state: BannerStore) => T): T => {
  const store = useContext(BannerStoreContext);

  if (!store) throw new Error("Missing BannerStoreProvider");

  return useStore(store, selector);
};
