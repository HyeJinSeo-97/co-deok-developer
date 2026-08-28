import type { NextRequest } from "next/server";

/** 본문을 가질 수 없는 메서드 */
const BODYLESS_METHODS = new Set(["GET", "HEAD"]);

/**
 * 업스트림 API 오리진을 반환
 * @return `API_UPSTREAM` 환경 변수 값 (뒤쪽 슬래시 제거)
 * @throws 환경 변수가 설정되지 않은 경우
 */
const getUpstreamOrigin = (): string => {
  const upstream = process.env.API_UPSTREAM;

  if (!upstream)
    throw new Error("환경 변수 API_UPSTREAM이 설정되지 않았습니다.");

  return upstream.replace(/\/+$/, "");
};

/**
 * 업스트림으로 전달할 요청 URL을 생성
 * @param request 들어온 요청
 * @param path catch-all 세그먼트 배열
 * @return 업스트림 전체 URL (query string 포함)
 */
export const buildUpstreamUrl = (
  request: NextRequest,
  path: string[],
): string => {
  const search = request.nextUrl.search;

  return `${getUpstreamOrigin()}/${path.join("/")}${search}`;
};

/**
 * 요청 본문을 재사용 가능한 ArrayBuffer로 버퍼링
 * Node 요청 스트림은 1회성이므로, 재시도를 위해 미리 읽어둠
 * @param request 들어온 요청
 * @return 본문 버퍼. 본문이 없거나 본문을 가질 수 없는 메서드면 undefined
 */
export const bufferRequestBody = async (
  request: NextRequest,
): Promise<ArrayBuffer | undefined> => {
  if (BODYLESS_METHODS.has(request.method)) return undefined;

  const body = await request.arrayBuffer();

  return body.byteLength > 0 ? body : undefined;
};

interface SendUpstreamParams {
  url: string;
  method: string;
  headers: Headers;
  body?: ArrayBuffer;
  accessToken?: string;
}

/**
 * 업스트림에 실제 요청을 전송
 * @param params 요청 정보와 주입할 accessToken
 * @return 업스트림 응답
 */
export const sendUpstream = async ({
  url,
  method,
  headers,
  body,
  accessToken,
}: SendUpstreamParams): Promise<Response> => {
  const upstreamHeaders = new Headers(headers);

  if (accessToken)
    upstreamHeaders.set("Authorization", `Bearer ${accessToken}`);
  else upstreamHeaders.delete("Authorization");

  return fetch(url, {
    method,
    headers: upstreamHeaders,
    body,
    // 본문을 스트림이 아닌 버퍼로 넘기더라도 Node fetch가 요구하는 옵션
    ...(body ? { duplex: "half" as const } : {}),
    redirect: "manual",
    cache: "no-store",
  });
};
