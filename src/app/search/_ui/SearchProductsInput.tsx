"use client";

import { useState } from "react";

import { IconSearch } from "@tabler/icons-react";

import { useSearchStore } from "@/app/_stores";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/shadcn/input-group";

export function SearchProductsInput() {
  const [query, setQuery] = useState("");

  const addSearch = useSearchStore((state) => state.addSearch);

  /**
   * 엔터 입력 시 검색어를 스토어에 저장
   * @param event 키보드 이벤트
   */
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    // 한글 입력 조합 중 엔터는 무시
    if (event.nativeEvent.isComposing) return;

    if (event.key !== "Enter") return;

    addSearch(query);
    setQuery("");
  };

  return (
    <InputGroup className={"h-9 bg-accent"}>
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>

      <InputGroupInput
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={"상품, 브랜드"}
        className={"h-full"}
      />
    </InputGroup>
  );
}
