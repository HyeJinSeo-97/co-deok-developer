"use client";

import { IconHistory, IconX } from "@tabler/icons-react";

import { useSearchStore } from "@/app/_stores";
import type { SearchQuery } from "@/app/search/_model";
import { Button } from "@/shared/shadcn/button";

import { SearchItemTemplate } from "./SearchItemTemplate";

interface RecentSearchProps {
  search: SearchQuery;
}

function RecentSearch({ search }: RecentSearchProps) {
  const removeSearch = useSearchStore((state) => state.removeSearch);

  return (
    <li className={"w-full inline-flex items-center justify-between"}>
      <span>{search.query}</span>
      <Button
        variant={null}
        size={"icon-xs"}
        onClick={() => removeSearch(search.id)}
      >
        <IconX />
      </Button>
    </li>
  );
}

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
        <ul className={"py-2 space-y-2"}>
          {searches.map((search) => (
            <RecentSearch key={search.id} search={search} />
          ))}
        </ul>
      </SearchItemTemplate>
    )
  );
}
