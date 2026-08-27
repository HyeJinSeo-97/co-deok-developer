/**
 * 로그인 실패 사유 코드
 * OAuth 라우트 핸들러가 `/login?error=...`로 전달하는 값과 1:1로 대응한다
 */
export type LoginErrorCode =
  | "unsupported_provider"
  | "missing_credentials"
  | "denied"
  | "missing_code"
  | "invalid_state"
  | "login_failed";

/** 사용자에게 보여줄 실패 안내 문구 */
export interface LoginErrorMessage {
  /** 한 줄 제목 */
  title: string;
  /** 원인과 다음 행동을 알려주는 설명 */
  description: string;
  /** 사용자가 재시도해서 해결될 수 있는 문제인지 */
  retryable: boolean;
}
