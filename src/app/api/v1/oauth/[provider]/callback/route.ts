import { type NextRequest, NextResponse } from "next/server";

import {
  buildRedirectUri,
  clearStateCookie,
  exchangeCodeForToken,
  resolveProvider,
  setSessionCookie,
} from "@/app/api/v1/oauth/_lib";
import { OAUTH_STATE_COOKIE } from "@/shared/api/bff";
import { HOME_PAGE } from "@/shared/model";

/**
 * 동적 세그먼트를 담은 route context
 *
 * `provider` 값은 `[provider]` 폴더명에서 오며 Next.js가 경로에서 채워준다.
 * 키 이름이 폴더명으로 고정되는 이유는 로그인 시작 라우트(`../route.ts`)의 주석 참고.
 *
 * 이 핸들러는 경로 파라미터와 쿼리를 함께 쓰기 때문에 둘의 차이가 드러난다.
 * `params.provider`는 존재가 보장되지만, 제공자가 붙여 보내는
 * `code`/`state`는 누락·위조될 수 있어 아래에서 하나씩 검증한다.
 */
interface RouteContext {
  params: Promise<{ provider: string }>;
}

/**
 * 로그인 실패 시 사유를 담아 로그인 화면으로 되돌리는 응답 생성
 * @param request 들어온 요청
 * @param reason 쿼리로 노출할 실패 사유
 * @return 로그인 화면 리다이렉트 응답
 */
const redirectToLogin = (
  request: NextRequest,
  reason: string,
): NextResponse => {
  console.log("==========[CALLBACK]============");
  console.log({ request, reason });
  console.log("======================");
  const response = NextResponse.redirect(
    new URL(`/login?error=${reason}`, request.url),
  );

  clearStateCookie(response);

  return response;
};

/**
 * OAuth 콜백 — 인가 코드를 토큰으로 바꾸고 프로필을 세션 쿠키에 기록
 * 시크릿이 서버에만 존재하도록 토큰 교환은 전부 이 핸들러에서 수행한다
 * @param request 들어온 요청
 * @param context 제공자 세그먼트
 * @return 홈 또는 로그인 화면으로의 리다이렉트 응답
 */
export const GET = async (
  request: NextRequest,
  { params }: RouteContext,
): Promise<Response> => {
  const { provider } = await params;
  const config = resolveProvider(provider);

  if (!config) return redirectToLogin(request, "unsupported_provider");

  const { searchParams } = request.nextUrl;
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = request.cookies.get(OAUTH_STATE_COOKIE)?.value;

  // 사용자가 동의를 취소하면 code 없이 error만 넘어온다
  if (searchParams.get("error")) return redirectToLogin(request, "denied");

  if (!code) return redirectToLogin(request, "missing_code");

  // state 불일치는 위조된 콜백이므로 즉시 중단
  if (!state || !storedState || state !== storedState)
    return redirectToLogin(request, "invalid_state");

  try {
    // 프로필은 여기서 조회하지 않는다 — /api/v1/me가 매번 최신 값을 가져오므로
    // 콜백은 토큰만 저장하고 빠르게 리다이렉트한다
    const tokens = await exchangeCodeForToken(
      config,
      code,
      buildRedirectUri(request, config.id),
      state,
    );

    const response = NextResponse.redirect(
      new URL(HOME_PAGE.href, request.url),
    );

    setSessionCookie(response, tokens, request);
    clearStateCookie(response);

    return response;
  } catch (error) {
    // 실패 사유를 쿼리에 실어 실제 키 투입 후에도 원인을 추적할 수 있게 한다
    const reason = error instanceof Error ? error.message : "unknown";

    return redirectToLogin(
      request,
      `login_failed&reason=${encodeURIComponent(reason)}`,
    );
  }
};
