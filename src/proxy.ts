import { type NextRequest, NextResponse } from "next/server";

import { parseSessionTokens, SESSION_COOKIE } from "@/shared/api/bff";
import { HOME_PAGE, LOGIN_PAGE } from "@/shared/model";

/**
 * 페이지 요청 단위 인증 리다이렉트
 *
 * 로그인한 사용자가 /login에 오면 홈으로 보낸다.
 * 이미 토큰이 있는데 로그인 화면을 다시 보여줄 이유가 없다
 * @param request 들어온 요청
 * @return 리다이렉트 응답 또는 그대로 통과
 */
export function proxy(request: NextRequest): NextResponse {
  // Edge 런타임이라 next/headers의 cookies() 대신 request.cookies를 쓴다.
  // 토큰 만료 여부는 외부 호출이 필요해 여기서 판단하지 않는다 —
  // /api/v1/me가 401을 만나면 갱신하도록 되어 있다
  const isLoggedIn =
    parseSessionTokens(request.cookies.get(SESSION_COOKIE)?.value) !== null;

  const { pathname } = request.nextUrl;

  if (isLoggedIn && pathname === LOGIN_PAGE.href)
    return NextResponse.redirect(new URL(HOME_PAGE.href, request.url));

  return NextResponse.next();
}

export const config = {
  /**
   * BFF 라우트(/api)와 정적 자산은 제외한다.
   * /api를 포함하면 OAuth 콜백까지 가로채 로그인 흐름이 깨진다
   */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts|.*\\..*).*)"],
};
