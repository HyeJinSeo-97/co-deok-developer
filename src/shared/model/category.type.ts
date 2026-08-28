/** 퀵메뉴 단일 항목 */
export interface QuickMenuItem {
  /** 항목 식별자 */
  id: string;
  /** 항목 표시명 */
  name: string;
  /** 트래킹용 data 속성 값 */
  dataAttr: string;
  /** 이동 경로 */
  href: string;
  /** 신규 항목 여부 (NEW 배지 노출) */
  isNew: boolean;
}
