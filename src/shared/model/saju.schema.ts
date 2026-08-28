import { z } from "zod";

/** 사주 프로필 입력 검증 스키마 */
export const sajuProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해 주세요.")
    .max(20, "이름은 20자까지 입력할 수 있습니다."),
  gender: z.enum(["male", "female"], { message: "성별을 선택해 주세요." }),
  birthDate: z
    .string()
    .min(1, "생년월일을 입력해 주세요.")
    // input[type=date]가 YYYY-MM-DD를 보장하지만, 값이 조작될 수 있어 다시 확인한다
    .regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일 형식이 올바르지 않습니다.")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00`);

      // 존재하지 않는 날짜(2월 30일 등)는 Date가 다른 날로 넘겨버리므로 역검증한다
      return !Number.isNaN(date.getTime()) && value === toDateString(date);
    }, "존재하지 않는 날짜입니다.")
    .refine(
      (value) => new Date(`${value}T00:00:00`) <= new Date(),
      "생년월일은 미래일 수 없습니다.",
    ),
  calendarType: z.enum(["solar", "lunar"]),
  birthTime: z.enum([
    "unknown",
    "ja",
    "chuk",
    "in",
    "myo",
    "jin",
    "sa",
    "mi",
    "o",
    "sin",
    "yu",
    "sul",
    "hae",
  ]),
});

/**
 * Date를 YYYY-MM-DD 문자열로 변환
 * 로컬 타임존 기준으로 만들어야 입력값과 그대로 대조된다 (toISOString은 UTC로 밀린다)
 * @param date 변환할 날짜
 * @return YYYY-MM-DD 문자열
 */
function toDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
