import type { SearchSuggestion } from "@/app/(search)/search/_model";
import { findMatchRanges } from "@/shared/lib";

/**
 * 검색어와 일치하는 검색 제안만 필터링
 * 강조 표시(SearchHighlight)와 동일한 matcher 를 사용해 필터 결과와 강조 구간을 일치시킴
 * @param suggestions 검색 제안 전체 목록
 * @param query 입력한 검색어
 */
export const filterSuggestions = (
  suggestions: SearchSuggestion[],
  query: string,
): SearchSuggestion[] => {
  if (!query.trim()) return [];

  return suggestions.filter(
    (suggestion) => findMatchRanges(suggestion.keyword, query).length > 0,
  );
};
