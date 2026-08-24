import type { ComponentProps } from "react";

import {
  type Icon,
  IconAward,
  IconBarbell,
  IconBottle,
  IconBrandAppgallery,
  IconBrush,
  IconBubble,
  IconConfetti,
  IconDental,
  IconDiamond,
  IconDroplet,
  IconGift,
  IconGiftCard,
  IconHanger,
  IconLeaf,
  IconMan,
  IconMoodSmile,
  IconPalette,
  IconPaw,
  IconPerfume,
  IconScissors,
  IconSofa,
  IconSpray,
  IconSun,
  IconToolsKitchen2,
  IconWashMachine,
} from "@tabler/icons-react";

/**
 * 퀵메뉴 항목 id별 아이콘 매핑
 * 아이콘은 함수형 컴포넌트라 서버->클라이언트 props로 직렬화할 수 없으므로,
 * 데이터에는 id만 두고 실제 컴포넌트는 여기서 매핑한다
 */
const ICON_BY_ID: Record<string, Icon> = {
  makeup: IconBrush,
  "body-care": IconBottle,
  "mask-pack": IconMoodSmile,
  cleansing: IconBubble,
  "skin-care": IconDroplet,
  "hair-care": IconScissors,
  "beauty-tools": IconPalette,
  "oral-care": IconDental,
  "health-food": IconLeaf,
  food: IconToolsKitchen2,
  "sun-care": IconSun,
  perfume: IconPerfume,
  nail: IconSpray,
  "hobby-fancy": IconPaw,
  "lux-edit": IconDiamond,
  "mens-edit": IconMan,
  gift: IconGift,
  "membership-coupon": IconBrandAppgallery,
  "gift-card": IconGiftCard,
  awards: IconAward,
  festa: IconConfetti,
  "home-living": IconSofa,
  "health-goods": IconBarbell,
  hygiene: IconWashMachine,
  fashion: IconHanger,
};

/** QuickMenuIcon props — 퀵메뉴 id + Tabler 아이콘 props 전체 */
export type QuickMenuIconProps = { id: string } & ComponentProps<Icon>;

/**
 * 퀵메뉴 아이콘
 * Tabler 아이콘과 동일하게 size·stroke·className 등을 그대로 받는다
 * @param id 퀵메뉴 항목 식별자
 */
export function QuickMenuIcon({ id, ...props }: QuickMenuIconProps) {
  const MenuIcon = ICON_BY_ID[id];

  if (!MenuIcon) return null;

  return <MenuIcon {...props} />;
}
