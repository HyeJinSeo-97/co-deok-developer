import type { OAuthProviderId } from "@/shared/api/bff";

/** 제공자별 OAuth 엔드포인트와 자격 증명 */
export interface OAuthProviderConfig {
  /** 제공자 식별자 */
  id: OAuthProviderId;
  /** 인가 코드를 발급받는 로그인 페이지 */
  authorizeUrl: string;
  /** 인가 코드를 토큰으로 교환하는 엔드포인트 */
  tokenUrl: string;
  /** 액세스 토큰으로 사용자 정보를 조회하는 엔드포인트 */
  profileUrl: string;
  /** 앱 식별자 (카카오는 REST API 키) */
  clientId?: string;
  /** 앱 시크릿. 카카오는 콘솔에서 ON일 때만 필요하므로 선택값 */
  clientSecret?: string;
}
