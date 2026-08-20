"use client";

import { useSearchStore } from "@/app/_stores";

import { RealTimePurchaseRankingList } from "./RealTimePurchaseRankingList";
import { RecentSearches } from "./RecentSearches";
import { SearchProductList } from "./SearchProductList";

export function SearchContent() {
  const searchQuery = useSearchStore((state) => state.searchQuery);

  return searchQuery.length > 0 ? (
    <SearchProductList />
  ) : (
    <>
      <RecentSearches />

      <RealTimePurchaseRankingList />
    </>
  );
}
