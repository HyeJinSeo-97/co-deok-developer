"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";

import type { ProductsStore, ProductsStoreApi } from "./products.store";

export const ProductsStoreContext = createContext<ProductsStoreApi | null>(
  null,
);

/**
 * products 스토어 selector 훅
 * @param selector 구독할 상태를 고르는 selector
 */
export const useProductsStore = <T,>(
  selector: (state: ProductsStore) => T,
): T => {
  const store = useContext(ProductsStoreContext);

  if (!store) throw new Error("Missing ProductsStoreProvider");

  return useStore(store, selector);
};
