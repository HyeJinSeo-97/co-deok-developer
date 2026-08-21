"use client";

import { IconSearch } from "@tabler/icons-react";

import { useSearchProductsInput } from "@/app/(search)/search/_hooks";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/shared/shadcn/input-group";

export function SearchProductsInput() {
  const { searchQuery, handleChange, handleKeyDown } =
    useSearchProductsInput();

  return (
    <InputGroup className={"h-9 bg-accent"}>
      <InputGroupAddon>
        <IconSearch />
      </InputGroupAddon>

      <InputGroupInput
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={"상품, 브랜드"}
        className={"h-full"}
      />
    </InputGroup>
  );
}
