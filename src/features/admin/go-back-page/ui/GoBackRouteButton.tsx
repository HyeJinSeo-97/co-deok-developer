"use client";

import { Button } from "@/shared/shadcn/button";
import { IconChevronLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export function GoBackRouteButton() {
  const router = useRouter();

  return (
    <Button variant={null} size={"icon"} onClick={() => router.back()}>
      <IconChevronLeft />
    </Button>
  );
}
