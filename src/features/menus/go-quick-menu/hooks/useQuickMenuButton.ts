"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export const useQuickMenuButton = () => {
  const router = useRouter();

  const goQuickMenu = useCallback(
    (name: string) => {
      console.log({ name });
    },
    [router],
  );

  return {
    goQuickMenu,
  };
};
