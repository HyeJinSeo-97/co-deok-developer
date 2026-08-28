"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  BIRTH_TIME_OPTIONS,
  CALENDAR_OPTIONS,
  GENDER_OPTIONS,
} from "@/app/onboarding/_model";
import { useSajuProfile } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { HOME_PAGE, type SajuProfile, sajuProfileSchema } from "@/shared/model";
import { Button } from "@/shared/shadcn/button";
import { Input } from "@/shared/shadcn/input";
import { Label } from "@/shared/shadcn/label";

/**
 * 사주 계산에 필요한 정보를 입력받는 폼
 * 카카오는 이름·생년월일을 비즈 앱 검수 없이 제공하지 않고 태어난 시는 아예 없어서
 * 사용자에게 직접 입력받는다
 */
export function SajuProfileForm() {
  const router = useRouter();
  const { save } = useSajuProfile();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SajuProfile>({
    resolver: zodResolver(sajuProfileSchema),
    defaultValues: {
      name: "",
      birthDate: "",
      calendarType: "solar",
      birthTime: "unknown",
    },
  });

  const gender = watch("gender");
  const calendarType = watch("calendarType");

  const onSubmit = (values: SajuProfile) => {
    save(values);
    // 입력을 마치면 홈으로 돌아간다. replace라 뒤로 가기로 폼에 되돌아오지 않는다
    router.replace(HOME_PAGE.href);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"flex flex-col gap-6"}
      noValidate
    >
      <div className={"flex flex-col gap-2"}>
        <Label htmlFor={"name"}>이름</Label>
        <Input id={"name"} placeholder={"홍길동"} {...register("name")} />
        {errors.name && (
          <p className={"text-sm text-destructive"}>{errors.name.message}</p>
        )}
      </div>

      <div className={"flex flex-col gap-2"}>
        <Label>성별</Label>
        <div className={"flex gap-2"}>
          {GENDER_OPTIONS.map((option) => (
            <Button
              key={option.id}
              type={"button"}
              variant={gender === option.id ? "default" : "outline"}
              className={"flex-1"}
              onClick={() =>
                setValue("gender", option.id, { shouldValidate: true })
              }
            >
              {option.label}
            </Button>
          ))}
        </div>
        {errors.gender && (
          <p className={"text-sm text-destructive"}>{errors.gender.message}</p>
        )}
      </div>

      <div className={"flex flex-col gap-2"}>
        <Label htmlFor={"birthDate"}>생년월일</Label>
        <div className={"flex gap-2"}>
          {CALENDAR_OPTIONS.map((option) => (
            <Button
              key={option.id}
              type={"button"}
              variant={calendarType === option.id ? "default" : "outline"}
              className={"flex-1"}
              onClick={() => setValue("calendarType", option.id)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <Input id={"birthDate"} type={"date"} {...register("birthDate")} />
        {errors.birthDate && (
          <p className={"text-sm text-destructive"}>
            {errors.birthDate.message}
          </p>
        )}
      </div>

      <div className={"flex flex-col gap-2"}>
        <Label htmlFor={"birthTime"}>태어난 시</Label>
        {/* 정확한 시각을 모르는 사용자가 많아 "모름"을 기본값으로 둔다 */}
        <select
          id={"birthTime"}
          {...register("birthTime")}
          className={cn(
            "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm",
            "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
          )}
        >
          {BIRTH_TIME_OPTIONS.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className={"flex flex-row gap-2"}>
        <Button type={"submit"} className={"flex-1"} disabled={isSubmitting}>
          시작하기
        </Button>

        {/*
          건너뛰기는 입력을 저장하지 않고 홈으로 보낸다.
          type="button"이어야 form 제출(검증)이 트리거되지 않는다
        */}
        <Button
          type={"button"}
          variant={"secondary"}
          className={"flex-1"}
          onClick={() => router.replace(HOME_PAGE.href)}
        >
          건너뛰기
        </Button>
      </div>
    </form>
  );
}
