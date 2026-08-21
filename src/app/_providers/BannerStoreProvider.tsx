"use client";

import { type ReactNode, useRef } from "react";

import {
  type BannerState,
  type BannerStoreApi,
  BannerStoreContext,
  createBannerStore,
  initBannerStore,
} from "@/app/_stores/banner";

interface BannerStoreProviderProps {
  children: ReactNode;
  initialState?: BannerState;
}

/**
 * banner 스토어 Provider
 * @param children 하위 트리
 * @param initialState 서버에서 주입하는 초기 상태
 */
export const BannerStoreProvider = ({
  children,
  initialState,
}: BannerStoreProviderProps) => {
  const storeRef = useRef<BannerStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createBannerStore(initialState ?? initBannerStore());
  }

  return (
    <BannerStoreContext.Provider value={storeRef.current}>
      {children}
    </BannerStoreContext.Provider>
  );
};
