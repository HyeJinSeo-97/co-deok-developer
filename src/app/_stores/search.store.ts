import type { StoreApi } from "zustand";
import { createStore } from "zustand/vanilla";

import type { SearchQuery } from "@/app/search/_model";
import { generateNewUuid } from "@/shared/lib";

export interface SearchState {
  /** 최근 검색어 목록 (최신순) */
  searches: SearchQuery[];
}

export interface SearchActions {
  /** 검색어 추가 */
  addSearch: (query: string) => void;

  /** 검색어 단건 삭제 */
  removeSearch: (id: string) => void;

  /** 검색어 전체 삭제 */
  clearSearches: () => void;
}

export type SearchStore = SearchState & SearchActions;
export type SearchStoreApi = StoreApi<SearchStore>;

/**
 * search 스토어 기본값
 */
export const initSearchStore = (): SearchState => ({
  searches: [],
});

/**
 * search 스토어 인스턴스 생성
 */
export const createSearchStore = (
  initState: SearchState = initSearchStore(),
): SearchStoreApi =>
  createStore<SearchStore>()((set) => ({
    ...initState,

    addSearch: (query) =>
      set((state) => {
        const trimmedQuery = query.trim();

        // 빈 검색어는 저장하지 않음
        if (!trimmedQuery) return state;

        // 이미 있는 검색어는 중복 저장하지 않고 최신으로 끌어올림
        const restSearches = state.searches.filter(
          (search) => search.query !== trimmedQuery,
        );

        return {
          searches: [
            { id: generateNewUuid(), query: trimmedQuery },
            ...restSearches,
          ],
        };
      }),

    removeSearch: (id) =>
      set((state) => ({
        searches: state.searches.filter((search) => search.id !== id),
      })),

    clearSearches: () => set(initSearchStore()),
  }));
