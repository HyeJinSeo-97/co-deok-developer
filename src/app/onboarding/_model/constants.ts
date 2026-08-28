import type { BirthTimeId, CalendarType, Gender } from "@/shared/model";

/** 성별 선택 옵션 */
export const GENDER_OPTIONS: readonly { id: Gender; label: string }[] = [
  { id: "male", label: "남성" },
  { id: "female", label: "여성" },
] as const;

/** 양력/음력 선택 옵션 */
export const CALENDAR_OPTIONS: readonly {
  id: CalendarType;
  label: string;
}[] = [
  { id: "solar", label: "양력" },
  { id: "lunar", label: "음력" },
] as const;

/** 12지시 선택 옵션 (시간 범위를 함께 노출해 고르기 쉽게 한다) */
export const BIRTH_TIME_OPTIONS: readonly {
  id: BirthTimeId;
  label: string;
}[] = [
  { id: "unknown", label: "모름" },
  { id: "ja", label: "자시 (23:30~01:30)" },
  { id: "chuk", label: "축시 (01:30~03:30)" },
  { id: "in", label: "인시 (03:30~05:30)" },
  { id: "myo", label: "묘시 (05:30~07:30)" },
  { id: "jin", label: "진시 (07:30~09:30)" },
  { id: "sa", label: "사시 (09:30~11:30)" },
  { id: "o", label: "오시 (11:30~13:30)" },
  { id: "mi", label: "미시 (13:30~15:30)" },
  { id: "sin", label: "신시 (15:30~17:30)" },
  { id: "yu", label: "유시 (17:30~19:30)" },
  { id: "sul", label: "술시 (19:30~21:30)" },
  { id: "hae", label: "해시 (21:30~23:30)" },
] as const;
