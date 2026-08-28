import type { OAuthProviderId } from "@/shared/api/bff";

import type { OAuthProviderConfig } from "./provider.type";

/**
 * 지원 제공자 설정을 반환
 * 환경 변수를 모듈 최상위가 아니라 호출 시점에 읽어야
 * 빌드 타임에 값이 번들로 고정되지 않는다
 * @return 제공자 식별자별 설정 맵
 */
const getProviderConfigs = (): Record<
  OAuthProviderId,
  OAuthProviderConfig
> => ({
  kakao: {
    id: "kakao",
    authorizeUrl: "https://kauth.kakao.com/oauth/authorize",
    tokenUrl: "https://kauth.kakao.com/oauth/token",
    profileUrl: "https://kapi.kakao.com/v2/user/me",
    clientId: process.env.KAKAO_REST_API_KEY,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
  },
  naver: {
    id: "naver",
    authorizeUrl: "https://nid.naver.com/oauth2.0/authorize",
    tokenUrl: "https://nid.naver.com/oauth2.0/token",
    profileUrl: "https://openapi.naver.com/v1/nid/me",
    clientId: process.env.NAVER_CLIENT_ID,
    clientSecret: process.env.NAVER_CLIENT_SECRET,
  },
});

/**
 * 경로 세그먼트가 지원하는 제공자인지 확인하고 설정을 반환
 * `in`이 아니라 `Object.hasOwn`을 쓴다 — `in`은 프로토타입 체인까지 훑어
 * `/oauth/constructor` 같은 경로가 검사를 통과해 버린다
 * @param provider 라우트 세그먼트로 들어온 제공자 문자열
 * @return 제공자 설정. 지원하지 않는 값이면 null
 */
export const resolveProvider = (
  provider: string,
): OAuthProviderConfig | null => {
  const configs = getProviderConfigs();

  return Object.hasOwn(configs, provider)
    ? configs[provider as OAuthProviderId]
    : null;
};
