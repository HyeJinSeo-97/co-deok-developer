import type { OAuthProvider } from "./types";

/**
 * OAuth 로그인 시작 경로 prefix
 * 실제 리다이렉트는 BFF 라우트 핸들러가 처리한다
 */
export const OAUTH_START_PATH = "/api/v1/oauth";

/** 로그인 화면에 노출할 OAuth 제공자 목록 (노출 순서대로) */
export const OAUTH_PROVIDERS: readonly OAuthProvider[] = [
  {
    id: "kakao",
    label: "카카오로 시작하기",
    href: `${OAUTH_START_PATH}/kakao`,
    className:
      "bg-[var(--brand-kakao)] text-[var(--brand-kakao-foreground)] hover:bg-[color-mix(in_oklch,var(--brand-kakao),black_8%)]",
  },
  {
    id: "naver",
    label: "네이버로 시작하기",
    href: `${OAUTH_START_PATH}/naver`,
    className:
      "bg-[var(--brand-naver)] text-[var(--brand-naver-foreground)] hover:bg-[color-mix(in_oklch,var(--brand-naver),black_8%)]",
  },
] as const;
