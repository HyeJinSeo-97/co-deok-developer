import type { NextRequest } from "next/server";

import { proxyWithAuth } from "@/shared/api/bff";

/** catch-all 세그먼트를 담은 route context */
interface RouteContext {
  params: Promise<{ path: string[] }>;
}

/**
 * 모든 메서드를 공통 프록시로 위임
 * @param request 들어온 요청
 * @param context catch-all 세그먼트
 * @return 업스트림 응답
 */
const handler = async (
  request: NextRequest,
  { params }: RouteContext,
): Promise<Response> => {
  const { path } = await params;

  return proxyWithAuth(request, path);
};

export const GET = handler;
export const HEAD = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
