"use client";

import { useRouter } from "next/navigation";

import { IconChevronLeft } from "@tabler/icons-react";

import { Button } from "@/shared/shadcn/button";

export function GoBackRouteButton() {
  const router = useRouter();

  return (
    <Button variant={null} size={"icon"} onClick={() => router.back()}>
      <IconChevronLeft />
    </Button>
  );
}
