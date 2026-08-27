import type { NextRequest, NextResponse } from "next/server";

import {
  OAUTH_STATE_COOKIE,
  SESSION_COOKIE,
  type SessionUser,
} from "@/shared/api/bff";

/** state 쿠키 유효 시간 (초) — 로그인 왕복에만 필요해 10분이면 충분 */
const STATE_MAX_AGE = 60 * 10;

/** 세션 쿠키 유효 시간 (초) */
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

/**
 * 요청이 https인지 판단
 * `pnpm start`는 로컬에서도 NODE_ENV가 production이라 그 값으로 secure를 정하면
 * http localhost에 Secure 쿠키가 실려 브라우저가 저장을 거부한다(= 항상 state 불일치).
 * 따라서 실제 프로토콜을 기준으로 판단한다
 * @param request 들어온 요청
 * @return https면 true
 */
const isSecureRequest = (request: NextRequest): boolean =>
  request.headers.get("x-forwarded-proto") === "https" ||
  new URL(request.url).protocol === "https:";

/**
 * CSRF 방어용 state 값을 생성
 * @return 예측 불가능한 난수 문자열
 */
export const createState = (): string => crypto.randomUUID();

/**
 * state를 httpOnly 쿠키에 저장
 * sameSite는 반드시 lax — 콜백이 제공자에서 넘어오는 크로스 사이트 이동이라
 * strict면 쿠키가 전송되지 않아 검증이 항상 실패한다
 * @param response 쿠키를 실을 응답
 * @param state 저장할 state 값
 * @param request 프로토콜 판단에 사용할 요청
 */
export const setStateCookie = (
  response: NextResponse,
  state: string,
  request: NextRequest,
): void => {
  response.cookies.set(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: isSecureRequest(request),
    path: "/",
    maxAge: STATE_MAX_AGE,
  });
};

/**
 * 사용한 state 쿠키를 제거
 * @param response 쿠키를 실을 응답
 */
export const clearStateCookie = (response: NextResponse): void => {
  response.cookies.delete(OAUTH_STATE_COOKIE);
};

/**
 * 로그인 세션을 httpOnly 쿠키에 기록
 * 데모 범위라 제공자 토큰 대신 조회한 프로필만 담아 토큰 수명 관리를 피한다
 * @param response 쿠키를 실을 응답
 * @param user 저장할 사용자 정보
 * @param request 프로토콜 판단에 사용할 요청
 */
export const setSessionCookie = (
  response: NextResponse,
  user: SessionUser,
  request: NextRequest,
): void => {
  response.cookies.set(SESSION_COOKIE, JSON.stringify(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: isSecureRequest(request),
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
};
