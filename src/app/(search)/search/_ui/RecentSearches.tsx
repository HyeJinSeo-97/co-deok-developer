"use client";

import { IconHistory } from "@tabler/icons-react";

import { useSearchStore } from "@/app/_stores";
import { Button } from "@/shared/shadcn/button";

import { RecentSearch } from "./RecentSearch";
import { SearchItemTemplate } from "./SearchItemTemplate";

export function RecentSearches() {
  const searches = useSearchStore((state) => state.searches);
  const clearSearches = useSearchStore((state) => state.clearSearches);

  return (
    searches.length > 0 && (
      <SearchItemTemplate
        icon={IconHistory}
        title={"최근 검색어"}
        actions={
          <Button variant={null} size={"sm"} onClick={clearSearches}>
            전체 삭제
          </Button>
        }
      >
        <ul className={"space-y-2"}>
          {searches.map((search) => (
            <RecentSearch key={search.id} search={search} />
          ))}
        </ul>
      </SearchItemTemplate>
    )
  );
}
