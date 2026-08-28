import { type NextRequest, NextResponse } from "next/server";

import {
  fetchProfile,
  refreshAccessToken,
  resolveProvider,
  setSessionCookie,
} from "@/app/api/v1/oauth/_lib";
import { readSessionTokens, type SessionUser } from "@/shared/api/bff";

/**
 * 로그인한 사용자의 프로필을 조회
 *
 * 세션 쿠키에는 토큰만 들어 있고 프로필은 매번 제공자에서 가져온다.
 * 덕분에 사용자가 카카오에서 닉네임을 바꾸면 즉시 반영된다.
 *
 * 액세스 토큰이 만료되면(약 6시간) 리프레시 토큰으로 재발급해 1회 재시도한다.
 * 만료 시각을 추적하는 대신 401을 만나면 갱신하는 방식이라 시계 오차에 영향받지 않는다.
 *
 * 쿠키 갱신은 라우트 핸들러에서만 가능하므로(서버 컴포넌트에서는 불가),
 * 화면은 이 엔드포인트를 호출해 프로필을 얻어야 한다.
 *
 * @param request 들어온 요청
 * @return 사용자 프로필. 비로그인·세션 만료 시 401
 */
export const GET = async (request: NextRequest): Promise<Response> => {
  const tokens = await readSessionTokens();

  // 쿠키가 없거나 모양이 깨진 경우 — 조작된 쿠키도 여기서 걸린다
  if (!tokens)
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 },
    );

  const config = resolveProvider(tokens.provider);

  if (!config)
    return NextResponse.json(
      { message: "지원하지 않는 제공자입니다." },
      { status: 401 },
    );

  try {
    const user: SessionUser = await fetchProfile(config, tokens.accessToken);

    return NextResponse.json(user);
  } catch {
    // 액세스 토큰 만료로 보고 갱신을 시도한다
    if (!tokens.refreshToken)
      return NextResponse.json(
        { message: "세션이 만료되었습니다." },
        { status: 401 },
      );

    try {
      const renewed = await refreshAccessToken(config, tokens.refreshToken);
      const user: SessionUser = await fetchProfile(config, renewed.accessToken);

      const response = NextResponse.json(user);

      // 갱신된 토큰을 쿠키에 다시 심는다 (라우트 핸들러라 가능)
      setSessionCookie(response, renewed, request);

      return response;
    } catch {
      // 리프레시 토큰까지 만료된 상태 — 재로그인이 필요하다
      return NextResponse.json(
        { message: "세션이 만료되었습니다." },
        { status: 401 },
      );
    }
  }
};
