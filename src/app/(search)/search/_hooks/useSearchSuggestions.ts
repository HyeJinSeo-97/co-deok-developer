"use client";

import { useMemo } from "react";

import { useSearchStore } from "@/app/_stores";
import { filterSuggestions } from "@/app/(search)/search/_lib";
import type { SearchSuggestion } from "@/app/(search)/search/_model";

interface UseSearchSuggestionsResult {
  /** 입력한 검색어 */
  searchQuery: string;

  /** 검색어와 일치하는 제안 목록 */
  matchedSuggestions: SearchSuggestion[];
}

/**
 * 입력한 검색어와 일치하는 검색 제안 목록을 반환
 * 필터 결과는 검색어에서 파생되므로 스토어에 저장하지 않음
 */
export const useSearchSuggestions = (): UseSearchSuggestionsResult => {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const suggestions = useSearchStore((state) => state.suggestions);

  const matchedSuggestions = useMemo(
    () => filterSuggestions(suggestions, searchQuery),
    [suggestions, searchQuery],
  );

  return { searchQuery, matchedSuggestions };
};
