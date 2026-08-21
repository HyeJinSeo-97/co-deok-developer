"use client";

import { IconX } from "@tabler/icons-react";

import { useSearchStore } from "@/app/_stores";
import type { SearchQuery } from "@/app/(search)/search/_model";
import { Button } from "@/shared/shadcn/button";

interface RecentSearchProps {
  search: SearchQuery;
}

/**
 * 최근 검색어 단건
 * 상위 RecentSearches 의 ul 안에서 렌더되므로 li 를 반환
 * @param search 최근 검색어
 */
export function RecentSearch({ search }: RecentSearchProps) {
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
