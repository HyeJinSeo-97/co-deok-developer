"use client";

import { type ReactNode, useRef } from "react";

import {
  createProductsStore,
  initProductsStore,
  type ProductsState,
  type ProductsStoreApi,
  ProductsStoreContext,
} from "@/app/_stores";

interface ProductsStoreProviderProps {
  children: ReactNode;

  initialState?: ProductsState;
}

/**
 * products 스토어 Provider
 */
export const ProductsStoreProvider = ({
  children,
  initialState,
}: ProductsStoreProviderProps): ReactNode => {
  const storeRef = useRef<ProductsStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createProductsStore(initialState ?? initProductsStore());
  }

  return (
    <ProductsStoreContext.Provider value={storeRef.current}>
      {children}
    </ProductsStoreContext.Provider>
  );
};
