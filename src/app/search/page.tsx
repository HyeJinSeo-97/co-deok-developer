import {
  RealTimePurchaseRankingList,
  RecentSearches,
  SearchProductsInput,
} from "./_ui";

export default function SearchRootPage() {
  return (
    <div className={"flex flex-col gap-2 py-2"}>
      <SearchProductsInput />

      <RecentSearches />

      <RealTimePurchaseRankingList />
    </div>
  );
}
