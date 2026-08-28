import type { LoginErrorCode, LoginErrorMessage } from "./errors.type";

/** 실패 사유별 안내 문구 */
const LOGIN_ERROR_MESSAGES: Record<LoginErrorCode, LoginErrorMessage> = {
  unsupported_provider: {
    title: "지원하지 않는 로그인 방식입니다",
    description:
      "아래 버튼으로 다시 시도해 주세요. 주소를 직접 입력하셨다면 오타가 없는지 확인해 주세요.",
    retryable: true,
  },
  missing_credentials: {
    title: "아직 준비되지 않은 로그인 방식입니다",
    description:
      "해당 제공자의 설정이 완료되지 않았습니다. 다른 방식으로 로그인해 주세요.",
    retryable: false,
  },
  denied: {
    title: "로그인이 취소되었습니다",
    description:
      "동의 화면에서 취소하셨습니다. 계속하시려면 다시 로그인해 주세요.",
    retryable: true,
  },
  missing_code: {
    title: "로그인 정보를 받지 못했습니다",
    description: "인증 과정이 완료되지 않았습니다. 다시 시도해 주세요.",
    retryable: true,
  },
  invalid_state: {
    title: "보안 검증에 실패했습니다",
    description:
      "로그인 요청이 만료되었거나 올바르지 않은 경로로 접근했습니다. 처음부터 다시 로그인해 주세요.",
    retryable: true,
  },
  login_failed: {
    title: "로그인을 완료하지 못했습니다",
    description:
      "일시적인 문제로 로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    retryable: true,
  },
};

/**
 * 쿼리로 들어온 사유 코드를 안내 문구로 변환
 * 쿼리 값은 사용자가 임의로 바꿀 수 있어 알 수 없는 값은 일반 실패로 처리한다
 * @param code `?error=` 쿼리 값
 * @return 안내 문구. code가 없으면 null (실패 상황이 아님)
 */
export const resolveLoginError = (
  code?: string | null,
): LoginErrorMessage | null => {
  if (!code) return null;

  return Object.hasOwn(LOGIN_ERROR_MESSAGES, code)
    ? LOGIN_ERROR_MESSAGES[code as LoginErrorCode]
    : LOGIN_ERROR_MESSAGES.login_failed;
};
