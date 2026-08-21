"use client";

import { useSearchStore } from "@/app/_stores";
import type { SearchSuggestion } from "@/app/(search)/search/_model";
import { Button } from "@/shared/shadcn/button";
import { Item, ItemContent, ItemMedia, ItemTitle } from "@/shared/shadcn/item";
import { SearchHighlight } from "@/shared/ui/highlight";

interface SearchSuggestionItemProps {
  suggestion: SearchSuggestion;

  /** 강조 표시할 입력 검색어 */
  searchQuery: string;
}

/**
 * 검색 제안 단건
 * @param suggestion 검색 제안
 * @param searchQuery 강조 표시할 입력 검색어
 */
export function SearchSuggestionItem({
  suggestion,
  searchQuery,
}: SearchSuggestionItemProps) {
  const addSearch = useSearchStore((state) => state.addSearch);
  const inputSearchQuery = useSearchStore((state) => state.inputSearchQuery);

  /**
   * 제안 검색어 선택 시 최근 검색어에 저장하고 입력값 초기화
   */
  const handleClick = (): void => {
    addSearch(suggestion.keyword);
    inputSearchQuery("");
  };

  return (
    <Button
      variant={null}
      className={"w-full justify-start px-0"}
      onClick={handleClick}
    >
      <Item>
        <ItemContent>
          <ItemTitle>
            <SearchHighlight text={suggestion.keyword} keyword={searchQuery} />
          </ItemTitle>
        </ItemContent>
      </Item>
      {/* mark 가 별도 flex item 이 되어 gap 이 끼는 것을 막기 위해 span 으로 감쌈 */}
      {/* <span>
        <SearchHighlight text={suggestion.keyword} keyword={searchQuery} />
      </span> */}
    </Button>
  );
}
