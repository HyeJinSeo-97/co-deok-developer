"use client";

import Link from "next/link";

import { IconShoppingBag } from "@tabler/icons-react";

import { SHOPPING_CART_PAGE } from "@/shared/model";
import { Button } from "@/shared/shadcn/button";

export function GoCartRouteButton() {
  return (
    <Link href={SHOPPING_CART_PAGE.href}>
      <Button variant={null} size={"icon"}>
        <IconShoppingBag />
      </Button>
    </Link>
  );
}
