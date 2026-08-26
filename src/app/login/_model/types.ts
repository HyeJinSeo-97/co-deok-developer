/** 지원하는 OAuth 제공자 식별자 */
export type OAuthProviderId = "kakao" | "naver";

/** OAuth 로그인 버튼 하나를 그리는 데 필요한 정보 */
export interface OAuthProvider {
  /** 제공자 식별자 */
  id: OAuthProviderId;
  /** 버튼에 노출할 문구 */
  label: string;
  /** 로그인 시작 경로 (BFF가 제공자 인증 페이지로 리다이렉트) */
  href: string;
  /** 버튼 배경/전경 색을 지정하는 Tailwind 클래스 (브랜드 토큰 기반) */
  className: string;
}
