import type { NextRequest, NextResponse } from "next/server";

/** httpOnly 쿠키를 쓸 때 조정 가능한 옵션 */
export interface SetCookieOptions {
  /** 쿠키 이름 */
  name: string;
  /** 저장할 값 */
  value: string;
  /**
   * 유효 시간 (초)
   * 생략하면 만료 시각이 없는 **세션 쿠키**가 되어
   * 브라우저(창)를 닫을 때 함께 폐기된다
   */
  maxAge?: number;
  /** 프로토콜 판단에 사용할 요청 */
  request: NextRequest;
  /**
   * 크로스 사이트 이동에서도 쿠키를 보낼지 결정
   * OAuth 콜백처럼 외부 도메인에서 돌아오는 흐름은 "lax"여야 한다
   * @default "lax"
   */
  sameSite?: "lax" | "strict" | "none";
  /**
   * 쿠키가 유효한 경로
   * @default "/"
   */
  path?: string;
  /**
   * JS 접근을 막을지 여부. 인증 관련 값은 반드시 true를 유지한다
   * @default true
   */
  httpOnly?: boolean;
}

/**
 * 요청이 https인지 판단
 * `pnpm start`는 로컬에서도 NODE_ENV가 production이라 그 값으로 secure를 정하면
 * http localhost에 Secure 쿠키가 실려 브라우저가 저장을 거부한다(= 쿠키가 항상 비어 있음).
 * 따라서 실제 프로토콜을 기준으로 판단한다
 * @param request 들어온 요청
 * @return https면 true
 */
export const isSecureRequest = (request: NextRequest): boolean =>
  request.headers.get("x-forwarded-proto") === "https" ||
  new URL(request.url).protocol === "https:";

/**
 * 응답에 httpOnly 쿠키를 심는다
 * secure 플래그는 요청 프로토콜에서 자동으로 결정되므로 호출부가 신경 쓰지 않는다
 * @param response 쿠키를 실을 응답
 * @param options 쿠키 이름·값과 선택 옵션 (maxAge 생략 시 세션 쿠키)
 */
export const setSecureCookie = (
  response: NextResponse,
  {
    name,
    value,
    maxAge,
    request,
    sameSite = "lax",
    path = "/",
    httpOnly = true,
  }: SetCookieOptions,
): void => {
  response.cookies.set(name, value, {
    httpOnly,
    sameSite,
    secure: isSecureRequest(request),
    path,
    // maxAge를 아예 넘기지 않아야 세션 쿠키가 된다.
    // undefined를 명시해도 되지만, 의도를 드러내려 조건부로 펼친다
    ...(maxAge === undefined ? {} : { maxAge }),
  });
};

/**
 * 응답에서 쿠키를 제거
 * @param response 쿠키를 실을 응답
 * @param name 제거할 쿠키 이름
 */
export const deleteCookie = (response: NextResponse, name: string): void => {
  response.cookies.delete(name);
};
