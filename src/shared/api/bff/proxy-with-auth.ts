import type { NextRequest } from "next/server";

import { readAccessToken } from "./auth";
import { buildClientHeaders, buildUpstreamHeaders } from "./headers";
import { bufferRequestBody, buildUpstreamUrl, sendUpstream } from "./upstream";

/**
 * BFF 공통 프록시 핸들러
 * httpOnly 쿠키의 accessToken을 Authorization 헤더로 주입해 업스트림에 전달하고,
 * 업스트림 응답을 그대로 클라이언트에 되돌려줌
 * @param request 들어온 요청
 * @param path catch-all 세그먼트 배열
 * @return 클라이언트에 반환할 응답
 */
export const proxyWithAuth = async (
  request: NextRequest,
  path: string[],
): Promise<Response> => {
  if (path.length === 0)
    return Response.json(
      { message: "요청 경로가 비어 있습니다." },
      { status: 400 },
    );

  try {
    const url = buildUpstreamUrl(request, path);
    const headers = buildUpstreamHeaders(request);
    const body = await bufferRequestBody(request);
    const accessToken = await readAccessToken();

    const response = await sendUpstream({
      url,
      method: request.method,
      headers,
      body,
      accessToken,
    });

    // TODO: 401 응답 시 refresh token으로 재발급 후 1회 재시도하는 로직을 이 지점에 추가
    return new Response(
      response.status === 204 || response.status === 304 ? null : response.body,
      {
        status: response.status,
        statusText: response.statusText,
        headers: buildClientHeaders(response),
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "업스트림 요청에 실패했습니다.";

    return Response.json({ message }, { status: 502 });
  }
};
