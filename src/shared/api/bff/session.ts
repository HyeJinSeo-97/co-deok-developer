import { cookies } from "next/headers";

/**
 * 로그인 세션이 담긴 httpOnly 쿠키 이름
 * 이 값의 단일 소스. BFF 프록시가 업스트림 인증에 쓰는 `accessToken`과 반드시 달라야 한다
 */
export const SESSION_COOKIE = "codeok_session";

/** CSRF 방어용 state를 잠시 보관하는 쿠키 이름 */
export const OAUTH_STATE_COOKIE = "codeok_oauth_state";

/**
 * 지원하는 OAuth 제공자 식별자
 * shared는 app을 참조할 수 없으므로 이 레이어에 정의하고, route 쪽에서 가져다 쓴다
 */
export type OAuthProviderId = "kakao" | "naver";

/**
 * 세션 쿠키에 저장하는 값
 * 프로필이 아니라 토큰만 담는다 — 프로필은 /api/v1/me가 매번 조회하므로
 * 제공자에서 닉네임을 바꿔도 즉시 반영된다
 */
export interface SessionTokens {
  /** 어느 제공자로 로그인했는지 — 조회 대상 API를 고를 때 필요 */
  provider: OAuthProviderId;
  /** 사용자 정보 조회에 쓰는 액세스 토큰 */
  accessToken: string;
  /** 만료 시 재발급에 쓰는 리프레시 토큰 */
  refreshToken?: string;
}

/** /api/v1/me가 반환하는 사용자 정보 */
export interface SessionUser {
  /** 제공자가 발급한 고유 식별자 */
  id: string;
  /** 로그인에 사용한 제공자 */
  provider: OAuthProviderId;
  /** 표시용 닉네임 */
  nickname: string;
  /** 프로필 이미지 URL. 동의 항목이 꺼져 있으면 없을 수 있다 */
  profileImageUrl?: string;
}

/**
 * 값이 SessionTokens 형태인지 검사
 * 쿠키는 사용자가 조작할 수 있고 JSON.parse 결과는 any이므로,
 * 캐스팅으로 넘기지 않고 실제 모양을 확인한다
 * @param value 파싱된 쿠키 값
 * @return SessionTokens면 true
 */
const isSessionTokens = (value: unknown): value is SessionTokens => {
  if (typeof value !== "object" || value === null) return false;

  const { provider, accessToken } = value as Record<string, unknown>;

  return (
    (provider === "kakao" || provider === "naver") &&
    typeof accessToken === "string" &&
    accessToken.length > 0
  );
};

/**
 * httpOnly 쿠키에서 세션 토큰을 읽어옴
 * @return 저장된 토큰. 세션이 없거나 값이 깨졌으면 null
 */
export const readSessionTokens = async (): Promise<SessionTokens | null> => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;

  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);

    return isSessionTokens(parsed) ? parsed : null;
  } catch {
    return null;
  }
};
