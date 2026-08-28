import type { OAuthProviderId } from "@/shared/api/bff";

/**
 * 제공자별 콜백 URL을 생성
 * 인가 요청과 토큰 교환에서 완전히 같은 값을 써야 하므로(불일치 시 KOE006)
 * 두 라우트 모두 이 함수로만 생성한다
 *
 * App Router 경로(`/api/v1/oauth/...`)를 알고 있어 shared로 올리지 않는다.
 * shared가 라우트 구조를 알게 되면 레이어 의존 방향이 뒤집힌다
 * @param request 들어온 요청 (오리진 추출용)
 * @param providerId 제공자 식별자
 * @return 콜백 절대 URL
 */
export const buildRedirectUri = (
  request: Request,
  providerId: OAuthProviderId,
): string => {
  const origin = process.env.APP_ORIGIN ?? new URL(request.url).origin;

  return `${origin}/api/v1/oauth/${providerId}/callback`;
};
