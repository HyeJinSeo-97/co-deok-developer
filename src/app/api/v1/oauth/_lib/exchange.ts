import type { SessionUser } from "@/shared/api/bff";

import type {
  KakaoProfileResponse,
  NaverProfileResponse,
  SessionTokens,
  TokenResponse,
} from "./exchange.type";
import type { OAuthProviderConfig } from "./provider.type";

/**
 * 토큰 엔드포인트에 요청을 보내고 응답을 검증
 * 발급·갱신이 같은 엔드포인트·형식을 쓰므로 한곳에서 처리한다
 * @param tokenUrl 제공자의 토큰 엔드포인트
 * @param body form-urlencoded 본문
 * @return 검증된 토큰 응답
 * @throws 요청이 실패했거나 액세스 토큰이 없는 경우
 */
const requestToken = async (
  tokenUrl: string,
  body: URLSearchParams,
): Promise<TokenResponse> => {
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    body,
    cache: "no-store",
  });

  if (!response.ok)
    throw new Error(`토큰 요청에 실패했습니다. (${response.status})`);

  const json = (await response.json()) as TokenResponse;

  if (!json.access_token) throw new Error("응답에 액세스 토큰이 없습니다.");

  return json;
};

/**
 * 인가 코드를 액세스 토큰으로 교환
 * @param config 제공자 설정
 * @param code 제공자가 콜백으로 넘겨준 인가 코드
 * @param redirectUri 인가 요청에 사용한 것과 완전히 동일한 콜백 URL
 * @param state 인가 요청에 사용한 state (네이버는 토큰 요청에도 필수)
 * @return 저장할 토큰 묶음 (액세스·리프레시)
 * @throws 교환에 실패한 경우
 */
export const exchangeCodeForToken = async (
  config: OAuthProviderConfig,
  code: string,
  redirectUri: string,
  state: string,
): Promise<SessionTokens> => {
  if (!config.clientId)
    throw new Error(`${config.id} 앱 키 환경 변수가 설정되지 않았습니다.`);

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: config.clientId,
    code,
  });

  if (config.id === "naver") {
    // 네이버는 client_secret과 state가 모두 필수이고 redirect_uri는 받지 않는다
    if (!config.clientSecret)
      throw new Error("NAVER_CLIENT_SECRET이 설정되지 않았습니다.");

    body.set("client_secret", config.clientSecret);
    body.set("state", state);
  } else {
    // 카카오는 redirect_uri가 필수, client_secret은 콘솔에서 ON일 때만 필요
    body.set("redirect_uri", redirectUri);

    if (config.clientSecret) body.set("client_secret", config.clientSecret);
  }

  const { access_token, refresh_token } = await requestToken(
    config.tokenUrl,
    body,
  );

  return {
    provider: config.id,
    accessToken: access_token,
    refreshToken: refresh_token,
  };
};

/**
 * 만료된 액세스 토큰을 리프레시 토큰으로 재발급
 * 카카오는 기존 리프레시 토큰의 만료가 1개월 미만일 때만 새 값을 내려주므로,
 * 응답에 refresh_token이 없으면 기존 값을 그대로 유지해야 한다(덮어쓰면 로그아웃됨)
 * @param config 제공자 설정
 * @param refreshToken 저장해둔 리프레시 토큰
 * @return 갱신된 토큰 묶음
 * @throws 갱신에 실패한 경우 (리프레시 토큰도 만료된 상황)
 */
export const refreshAccessToken = async (
  config: OAuthProviderConfig,
  refreshToken: string,
): Promise<SessionTokens> => {
  if (!config.clientId)
    throw new Error(`${config.id} 앱 키 환경 변수가 설정되지 않았습니다.`);

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: config.clientId,
    refresh_token: refreshToken,
  });

  if (config.clientSecret) body.set("client_secret", config.clientSecret);

  const { access_token, refresh_token } = await requestToken(
    config.tokenUrl,
    body,
  );

  return {
    provider: config.id,
    accessToken: access_token,
    // 새 값이 없으면 기존 리프레시 토큰을 유지
    refreshToken: refresh_token ?? refreshToken,
  };
};

/**
 * 액세스 토큰으로 사용자 정보를 조회해 세션 형태로 정규화
 * 닉네임·프로필 이미지는 동의 항목 설정에 따라 없을 수 있어 기본값을 둔다
 * @param config 제공자 설정
 * @param accessToken 조회에 사용할 액세스 토큰
 * @return 세션에 저장할 사용자 정보
 * @throws 조회에 실패한 경우
 */
export const fetchProfile = async (
  config: OAuthProviderConfig,
  accessToken: string,
): Promise<SessionUser> => {
  const response = await fetch(config.profileUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });

  if (!response.ok)
    throw new Error(`사용자 정보 조회에 실패했습니다. (${response.status})`);

  if (config.id === "kakao") {
    const data = (await response.json()) as KakaoProfileResponse;
    const profile = data.kakao_account?.profile;

    return {
      id: String(data.id),
      provider: "kakao",
      nickname: profile?.nickname ?? "카카오 사용자",
      profileImageUrl: profile?.profile_image_url,
    };
  }

  const data = (await response.json()) as NaverProfileResponse;

  if (!data.response) throw new Error("사용자 정보 응답이 비어 있습니다.");

  return {
    id: data.response.id,
    provider: "naver",
    nickname: data.response.nickname ?? "네이버 사용자",
    profileImageUrl: data.response.profile_image,
  };
};
