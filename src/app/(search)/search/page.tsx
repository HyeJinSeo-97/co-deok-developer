import { SearchContent, SearchProductsInput } from "./_ui";

export default async function SearchRootPage() {
  return (
    <div className={"flex flex-col gap-4 py-2"}>
      <SearchProductsInput />

      <SearchContent />
    </div>
  );
}
