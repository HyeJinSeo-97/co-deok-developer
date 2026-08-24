"use client";

import type { ReactNode } from "react";

import { toast as toastManager } from "@/shared/shadcn/toast";

/** 공통 토스트 옵션 */
export interface ToastOptions {
  /** 토스트 제목 */
  title: ReactNode;
  /** 토스트 부가 설명 */
  description?: ReactNode;
  /** 자동 닫힘 시간(ms). 0이면 자동으로 닫히지 않음 */
  timeout?: number;
}

/** 토스트 유형 — shadcn ToastIcon이 지원하는 값 */
type ToastType = "success" | "warning" | "error";

/**
 * 유형별 토스트 실행 함수 생성
 * @param type 토스트 유형
 * @returns 해당 유형으로 토스트를 띄우는 함수
 */
const createToast =
  (type: ToastType) =>
  ({ title, description, timeout }: ToastOptions): string =>
    toastManager.add({ type, title, description, timeout });

/**
 * 공통 토스트
 * @example toast.success({ title: "저장했습니다." })
 * @example toast.error({ title: "실패", description: "다시 시도해 주세요." })
 */
export const toast = {
  success: createToast("success"),
  warning: createToast("warning"),
  error: createToast("error"),
};
