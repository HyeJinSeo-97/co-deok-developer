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

/** 세션 쿠키에 저장된 로그인 사용자 정보 */
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
 * httpOnly 쿠키에서 로그인 사용자 정보를 읽어옴
 * @return 로그인 사용자 정보. 세션이 없거나 값이 깨졌으면 null
 */
export const readSession = async (): Promise<SessionUser | null> => {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;

  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
};
