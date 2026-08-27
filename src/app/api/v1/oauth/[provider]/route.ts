import { type NextRequest, NextResponse } from "next/server";

import {
  buildRedirectUri,
  createState,
  resolveProvider,
  setStateCookie,
} from "@/app/api/v1/oauth/_lib";

/**
 * 동적 세그먼트를 담은 route context
 *
 * `provider` 키의 이름은 넘겨주는 코드가 아니라 **폴더명이 결정**한다.
 * 이 파일 경로가 `oauth/[provider]/route.ts`이므로 키가 `provider`가 된다.
 * (폴더를 `[socialType]`으로 바꾸면 타입도 `{ socialType: string }`이 된다.)
 *
 * 값은 Next.js가 요청 URL의 경로에서 뽑아 채워준다.
 *   /api/v1/oauth/kakao -> params = { provider: "kakao" }
 *   /api/v1/oauth/naver -> params = { provider: "naver" }
 *
 * `searchParams`와 성격이 반대다.
 * - `params`      : 키가 폴더 구조로 고정되고, 값 존재가 보장된다.
 * - `searchParams`: 클라이언트가 아무 키나 붙일 수 있어 항상 null 검사가 필요하다.
 *   (콜백 라우트에서 `code`/`state`를 검사하는 이유)
 *
 * Promise인 이유: Next.js 15부터 `params`는 비동기다. 요청마다 달라지는 값이라
 * 이 값을 읽는 라우트는 정적 생성 대상에서 제외되며(빌드 결과의 `f Dynamic`),
 * await 지점을 명시해 렌더링 최적화 판단을 가능하게 한다.
 */
interface RouteContext {
  params: Promise<{ provider: string }>;
}

/**
 * OAuth 로그인 시작 — 제공자 인증 페이지로 리다이렉트
 * CSRF 방어를 위해 state를 만들어 쿠키와 쿼리에 함께 실어 보내고,
 * 콜백에서 두 값을 대조한다
 * @param request 들어온 요청
 * @param context 제공자 세그먼트
 * @return 제공자 인증 페이지로의 리다이렉트 응답
 */
export const GET = async (
  request: NextRequest,
  { params }: RouteContext,
): Promise<Response> => {
  const { provider } = await params;
  console.log({ params: await params, provider });
  const config = resolveProvider(provider);

  // 지원하지 않는 제공자는 500 대신 로그인 화면으로 되돌린다
  if (!config)
    return NextResponse.redirect(
      new URL("/login?error=unsupported_provider", request.url),
    );

  if (!config.clientId)
    return NextResponse.redirect(
      new URL("/login?error=missing_credentials", request.url),
    );

  const state = createState();
  const authorizeUrl = new URL(config.authorizeUrl);

  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("client_id", config.clientId);
  authorizeUrl.searchParams.set(
    "redirect_uri",
    buildRedirectUri(request, config.id),
  );
  authorizeUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authorizeUrl);

  setStateCookie(response, state, request);

  return response;
};
