import type { NextRequest, NextResponse } from "next/server";

import {
  deleteCookie,
  OAUTH_STATE_COOKIE,
  SESSION_COOKIE,
  type SessionTokens,
  setSecureCookie,
} from "@/shared/api/bff";

/** state 쿠키 유효 시간 (초) — 로그인 왕복에만 필요해 10분이면 충분 */
const STATE_MAX_AGE = 60 * 10;

/**
 * state를 httpOnly 쿠키에 저장
 * sameSite는 기본값 lax를 그대로 쓴다 — 콜백이 제공자에서 넘어오는 크로스 사이트
 * 이동이라 strict면 쿠키가 전송되지 않아 검증이 항상 실패한다
 * @param response 쿠키를 실을 응답
 * @param state 저장할 state 값
 * @param request 프로토콜 판단에 사용할 요청
 */
export const setStateCookie = (
  response: NextResponse,
  state: string,
  request: NextRequest,
): void => {
  setSecureCookie(response, {
    name: OAUTH_STATE_COOKIE,
    value: state,
    maxAge: STATE_MAX_AGE,
    request,
  });
};

/**
 * 사용한 state 쿠키를 제거
 * @param response 쿠키를 실을 응답
 */
export const clearStateCookie = (response: NextResponse): void => {
  deleteCookie(response, OAUTH_STATE_COOKIE);
};

/**
 * 로그인 세션(토큰)을 httpOnly 쿠키에 기록
 * 프로필이 아니라 토큰을 담아 /api/v1/me가 매번 최신 정보를 조회하게 한다
 *
 * maxAge를 지정하지 않아 **세션 쿠키**가 된다 — 브라우저(창)를 닫으면 토큰이 함께
 * 사라져 다음 방문 때 재로그인해야 한다. 공용 PC에서 세션이 남지 않는 이점이 있다
 * @param response 쿠키를 실을 응답
 * @param tokens 저장할 토큰 묶음
 * @param request 프로토콜 판단에 사용할 요청
 */
export const setSessionCookie = (
  response: NextResponse,
  tokens: SessionTokens,
  request: NextRequest,
): void => {
  setSecureCookie(response, {
    name: SESSION_COOKIE,
    value: JSON.stringify(tokens),
    request,
  });
};
