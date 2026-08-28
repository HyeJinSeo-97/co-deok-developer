import type { OAuthProviderId } from "@/shared/api/bff";

/** 토큰 교환·갱신 응답에서 실제로 사용하는 필드 */
export interface TokenResponse {
  access_token: string;
  /**
   * 카카오는 갱신 시 기존 리프레시 토큰의 만료가 1개월 미만일 때만 새로 내려준다.
   * 따라서 값이 없을 수 있고, 없을 때 기존 값을 덮어쓰면 로그아웃된다
   */
  refresh_token?: string;
  /** 액세스 토큰 만료까지 남은 초 */
  expires_in?: number;
  /** 리프레시 토큰 만료까지 남은 초 */
  refresh_token_expires_in?: number;
}

/** 세션 쿠키에 저장하는 토큰 묶음 */
export interface SessionTokens {
  /** 어느 제공자로 로그인했는지 — /api/v1/me가 호출 대상을 고를 때 필요 */
  provider: OAuthProviderId;
  /** 사용자 정보 조회에 쓰는 액세스 토큰 */
  accessToken: string;
  /** 만료 시 재발급에 쓰는 리프레시 토큰 */
  refreshToken?: string;
}

/** 카카오 사용자 정보 응답 중 사용하는 부분 */
export interface KakaoProfileResponse {
  id: number;
  kakao_account?: {
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

/** 네이버 사용자 정보 응답 중 사용하는 부분 */
export interface NaverProfileResponse {
  response?: {
    id: string;
    nickname?: string;
    profile_image?: string;
  };
}
