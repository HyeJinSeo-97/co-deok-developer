"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import { toast } from "@/shared/lib";

export const useQuickMenuButton = () => {
  const router = useRouter();

  const goQuickMenu = useCallback(
    (name: string) => {
      toast.success({
        title: (
          <span>
            <b>{name}</b> 메뉴로 이동합니다.
          </span>
        ),
      });
    },
    [router],
  );

  return {
    goQuickMenu,
  };
};
