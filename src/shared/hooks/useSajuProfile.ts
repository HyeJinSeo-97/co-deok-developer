"use client";

import { useCallback, useEffect, useState } from "react";

import {
  SAJU_PROFILE_STORAGE_KEY,
  type SajuProfile,
  sajuProfileSchema,
} from "@/shared/model";

interface UseSajuProfileResult {
  /** 저장된 프로필. 없으면 null */
  profile: SajuProfile | null;
  /** sessionStorage 확인이 끝났는지 — 끝나기 전에는 화면을 판단하지 않는다 */
  isLoaded: boolean;
  /** 프로필을 저장 */
  save: (profile: SajuProfile) => void;
  /** 프로필을 삭제 */
  clear: () => void;
}

/**
 * sessionStorage에 보관된 사주 프로필을 읽고 쓴다
 *
 * 로그인 세션 쿠키와 같은 수명을 갖도록 localStorage가 아닌 sessionStorage를 쓴다.
 * 단, sessionStorage는 **탭 단위**라 새 탭을 열면 비어 있다(쿠키는 탭 간 공유).
 *
 * 렌더 중에 sessionStorage를 읽으면 서버 렌더 결과와 달라져 hydration 오류가 나므로
 * useEffect에서 읽고, 그 전에는 isLoaded를 false로 유지한다
 * @return 프로필과 저장·삭제 함수
 */
export const useSajuProfile = (): UseSajuProfileResult => {
  const [profile, setProfile] = useState<SajuProfile | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SAJU_PROFILE_STORAGE_KEY);

      if (raw) {
        // 저장된 값이 조작·구버전일 수 있어 스키마로 다시 검증한다
        const parsed = sajuProfileSchema.safeParse(JSON.parse(raw));

        setProfile(parsed.success ? parsed.data : null);
      }
    } catch {
      // 프라이빗 모드 등에서 sessionStorage 접근이 막힐 수 있다
      setProfile(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const save = useCallback((next: SajuProfile) => {
    setProfile(next);

    try {
      sessionStorage.setItem(SAJU_PROFILE_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // 저장 실패해도 현재 탭에서는 상태로 동작하게 둔다
    }
  }, []);

  const clear = useCallback(() => {
    setProfile(null);

    try {
      sessionStorage.removeItem(SAJU_PROFILE_STORAGE_KEY);
    } catch {
      // 무시
    }
  }, []);

  return { profile, isLoaded, save, clear };
};
