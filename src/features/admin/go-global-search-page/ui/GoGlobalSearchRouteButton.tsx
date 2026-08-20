"use client";

import Link from "next/link";

import { IconSearch } from "@tabler/icons-react";

import { SEARCH_PAGE } from "@/shared/model";
import { Button } from "@/shared/shadcn/button";

export function GoGlobalSearchRouteButton() {
  return (
    <Link href={SEARCH_PAGE.href}>
      <Button variant={null} size={"icon"}>
        <IconSearch />
      </Button>
    </Link>
  );
}
