"use client";

import { type ReactNode, useRef } from "react";

import {
  createSearchStore,
  initSearchStore,
  type SearchState,
  type SearchStoreApi,
  SearchStoreContext,
} from "@/app/_stores";

interface SearchStoreProviderProps {
  children: ReactNode;

  initialState?: SearchState;
}

/**
 * search 스토어 Provider
 */
export const SearchStoreProvider = ({
  children,
  initialState,
}: SearchStoreProviderProps): ReactNode => {
  const storeRef = useRef<SearchStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createSearchStore(initialState ?? initSearchStore());
  }

  return (
    <SearchStoreContext.Provider value={storeRef.current}>
      {children}
    </SearchStoreContext.Provider>
  );
};
