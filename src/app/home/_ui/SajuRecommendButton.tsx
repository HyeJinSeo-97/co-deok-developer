"use client";

import Link from "next/link";

import { useSajuProfile } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { ONBOARDING_PAGE } from "@/shared/model";
import { buttonVariants } from "@/shared/shadcn/button";

/**
 * 사주 기반 추천 상품 화면으로 이동하는 버튼
 *
 * 사주 정보가 이미 있으면 문구를 바꿔 다시 입력하러 가는 흐름임을 알린다.
 * 정보 유무는 sessionStorage에 있어 클라이언트에서만 알 수 있다
 */
export function SajuRecommendButton() {
  const { profile, isLoaded } = useSajuProfile();

  // 확인 전에는 문구가 바뀌며 깜빡이므로 기본 문구로 고정한다
  const label =
    isLoaded && profile
      ? `${profile.name}님의 정보 수정하기`
      : "추가 정보 입력하고 추천 상품 보기";

  return (
    <Link
      href={ONBOARDING_PAGE.href}
      className={cn(buttonVariants(), "h-12 w-full")}
    >
      {label}
    </Link>
  );
}
