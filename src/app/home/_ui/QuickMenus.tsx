import { QuickMenuButton } from "@/features/menus/go-quick-menu";
import { QUICK_MENU } from "@/shared/model";
import { Card, CardContent } from "@/shared/shadcn/card";
import { ScrollArea, ScrollBar } from "@/shared/shadcn/scroll-area";

/**
 * 홈 퀵메뉴 영역
 * 2줄 고정 그리드를 열 방향으로 채워 가로 스크롤로 노출
 */
export function QuickMenus() {
  return (
    <div className={"space-y-2"}>
      <div className={"w-8 h-1 bg-accent mx-auto"} />

      <ScrollArea>
        {/* Card의 기본 overflow-hidden은 그리드를 잘라내 스크롤을 막으므로 해제하고,
          Card 자체가 콘텐츠 너비를 갖도록 w-max를 올린다 */}
        <Card variant={"transparent"} className={"w-max overflow-visible"}>
          <CardContent className={"grid grid-flow-col grid-rows-2 gap-y-4"}>
            {QUICK_MENU.map((menu) => (
              <QuickMenuButton key={menu.id} {...menu} />
            ))}
          </CardContent>
        </Card>

        <ScrollBar orientation={"horizontal"} className={"opacity-0"} />
      </ScrollArea>

      <div className={"w-8 h-1 bg-accent mx-auto"} />
    </div>
  );
}
