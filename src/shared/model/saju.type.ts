/** 성별 — 사주는 대운 방향 계산에 성별이 필요하다 */
export type Gender = "male" | "female";

/** 생년월일 기준 (양력/음력) */
export type CalendarType = "solar" | "lunar";

/**
 * 태어난 시(時)를 나타내는 12지시 식별자
 * 정확한 시각을 모르는 사용자가 많아 "unknown"을 허용한다 (삼주로 보는 경우)
 */
export type BirthTimeId =
  | "unknown"
  | "ja"
  | "chuk"
  | "in"
  | "myo"
  | "jin"
  | "sa"
  | "o"
  | "mi"
  | "sin"
  | "yu"
  | "sul"
  | "hae";

/** 사주 계산에 필요한 사용자 입력 정보 */
export interface SajuProfile {
  /** 이름 */
  name: string;
  /** 성별 */
  gender: Gender;
  /** 생년월일 (YYYY-MM-DD) */
  birthDate: string;
  /** 양력/음력 */
  calendarType: CalendarType;
  /** 태어난 시 */
  birthTime: BirthTimeId;
}
