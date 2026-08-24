"use client";

import { useQuickMenuButton } from "@/features/menus/go-quick-menu/hooks";
import type { QuickMenuItem } from "@/shared/model";
import { Button } from "@/shared/shadcn/button";
import { QuickMenuIcon } from "@/shared/ui/icons";

/**
 * 퀵메뉴 단일 항목
 * 가로 스크롤에서 찌그러지지 않도록 축소를 막는다.
 */
export function QuickMenuButton({ id, name }: QuickMenuItem) {
  const { goQuickMenu } = useQuickMenuButton();

  return (
    <Button
      variant={null}
      className={"w-16 md:w-22 h-auto flex-col items-center shrink-0"}
      onClick={() => goQuickMenu(name)}
    >
      <span
        className={
          "inline-flex items-center justify-center size-12 md:size-18 bg-accent rounded-md shadow-sm"
        }
      >
        <QuickMenuIcon
          id={id}
          stroke={"var(--accent)"}
          className={"size-6.5 md:size-10"}
        />
      </span>

      <strong className={"text-caption md:text-label whitespace-nowrap"}>
        {name}
      </strong>
    </Button>
  );
}
