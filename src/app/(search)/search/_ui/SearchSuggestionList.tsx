"use client";

import { IconSearch } from "@tabler/icons-react";

import { useSearchSuggestions } from "@/app/(search)/search/_hooks";

import { SearchItemTemplate } from "./SearchItemTemplate";
import { SearchSuggestionItem } from "./SearchSuggestionItem";

export function SearchSuggestionList() {
  const { searchQuery, matchedSuggestions } = useSearchSuggestions();

  return (
    <SearchItemTemplate icon={IconSearch} title={`'${searchQuery}' 검색 결과`}>
      {matchedSuggestions.length > 0 ? (
        <>
          {matchedSuggestions.map((suggestion) => (
            <SearchSuggestionItem
              key={suggestion.id}
              suggestion={suggestion}
              searchQuery={searchQuery}
            />
          ))}
        </>
      ) : (
        <p className={"py-4 text-muted-foreground text-center"}>
          검색 결과가 없습니다.
        </p>
      )}
    </SearchItemTemplate>
  );
}
