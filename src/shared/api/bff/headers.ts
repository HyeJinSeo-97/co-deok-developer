import type { NextRequest } from "next/server";

/** 업스트림에 전달하지 않는 hop-by-hop 헤더 (Node가 직접 관리) */
const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

/** 응답에서 그대로 되돌려주면 안 되는 헤더 */
const EXCLUDED_RESPONSE_HEADERS = new Set([
  "connection",
  "keep-alive",
  "transfer-encoding",
  "content-encoding",
  "content-length",
]);

/**
 * 클라이언트 요청 헤더에서 업스트림에 전달할 헤더만 추려냄
 * @param request 들어온 요청
 * @return 정제된 헤더
 */
export const buildUpstreamHeaders = (request: NextRequest): Headers => {
  const headers = new Headers();

  request.headers.forEach((value, key) => {
    if (!HOP_BY_HOP_HEADERS.has(key.toLowerCase())) headers.set(key, value);
  });

  // 브라우저 쿠키는 업스트림에 노출하지 않고, Authorization 헤더로만 인증
  headers.delete("cookie");

  return headers;
};

/**
 * 업스트림 응답 헤더에서 클라이언트에 되돌려줄 헤더만 추려냄
 * @param response 업스트림 응답
 * @return 정제된 헤더
 */
export const buildClientHeaders = (response: Response): Headers => {
  const headers = new Headers();

  response.headers.forEach((value, key) => {
    if (!EXCLUDED_RESPONSE_HEADERS.has(key.toLowerCase()))
      headers.set(key, value);
  });

  return headers;
};
