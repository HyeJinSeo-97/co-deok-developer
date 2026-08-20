"use client";

import { IconSearch } from "@tabler/icons-react";

import { SearchItemTemplate } from "./SearchItemTemplate";

export function SearchProductList() {
  return (
    <SearchItemTemplate icon={IconSearch} title={"제품을 검색하는 중..."}>
      <div>gg</div>
    </SearchItemTemplate>
  );
}
