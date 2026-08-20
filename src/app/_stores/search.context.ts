"use client";

import { createContext, useContext } from "react";

import { useStore } from "zustand";

import type { SearchStore, SearchStoreApi } from "./search.store";

export const SearchStoreContext = createContext<SearchStoreApi | null>(null);

/**
 * search 스토어 selector 훅
 * @param selector 구독할 상태를 고르는 selector
 */
export const useSearchStore = <T,>(selector: (state: SearchStore) => T): T => {
  const store = useContext(SearchStoreContext);

  if (!store) throw new Error("Missing SearchStoreProvider");

  return useStore(store, selector);
};
