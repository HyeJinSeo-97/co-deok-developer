/** 퀵메뉴 카테고리 단일 항목 */
export interface QuickMenuCategory {
  /** 카테고리 식별자 */
  id: string;
  /** 카테고리 표시명 */
  name: string;
  /** 트래킹용 data 속성 값 */
  dataAttr: string;
  /** 이동 경로 */
  href: string;
}

/** 홈 퀵메뉴 고정 카테고리 목록 */
export const QUICK_MENU_CATEGORIES: readonly QuickMenuCategory[] = [
  {
    id: "makeup",
    name: "메이크업",
    dataAttr: "홈^퀵메뉴^메이크업",
    href: "#",
  },
  {
    id: "body-care",
    name: "바디케어",
    dataAttr: "홈^퀵메뉴^바디케어",
    href: "#",
  },
  {
    id: "mask-pack",
    name: "마스크팩",
    dataAttr: "홈^퀵메뉴^마스크팩",
    href: "#",
  },
  {
    id: "cleansing",
    name: "클렌징",
    dataAttr: "홈^퀵메뉴^클렌징",
    href: "#",
  },
  {
    id: "skin-care",
    name: "스킨케어",
    dataAttr: "홈^퀵메뉴^스킨케어",
    href: "#",
  },
  {
    id: "hair-care",
    name: "헤어케어",
    dataAttr: "홈^퀵메뉴^헤어케어",
    href: "#",
  },
  {
    id: "beauty-tools",
    name: "뷰티소품",
    dataAttr: "홈^퀵메뉴^뷰티소품",
    href: "#",
  },
  {
    id: "oral-care",
    name: "구강용품",
    dataAttr: "홈^퀵메뉴^구강용품",
    href: "#",
  },
  {
    id: "sun-care",
    name: "선케어",
    dataAttr: "홈^퀵메뉴^선케어",
    href: "#",
  },
  {
    id: "perfume",
    name: "향수",
    dataAttr: "홈^퀵메뉴^향수",
    href: "#",
  },
  {
    id: "nail",
    name: "네일",
    dataAttr: "홈^퀵메뉴^네일",
    href: "#",
  },
] as const;
