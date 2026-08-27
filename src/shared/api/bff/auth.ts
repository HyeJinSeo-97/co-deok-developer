import { cookies } from "next/headers";

/** accessToken을 담고 있는 httpOnly 쿠키 이름 */
const ACCESS_TOKEN_COOKIE = "accessToken";

/**
 * httpOnly 쿠키에서 accessToken을 읽어옴
 * @return accessToken 값. 쿠키가 없으면 undefined
 */
export const readAccessToken = async (): Promise<string | undefined> => {
  const cookieStore = await cookies();

  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
};
