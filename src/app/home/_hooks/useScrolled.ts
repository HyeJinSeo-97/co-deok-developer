"use client";

import { useEffect, useState } from "react";

/** 스크롤 상태로 판정하는 최소 스크롤 거리 (px) */
const SCROLL_THRESHOLD = 8;

/**
 * 페이지가 스크롤된 상태인지 여부
 * threshold 를 두는 이유는 macOS·iOS 의 rubber band 스크롤이 0 근처에서
 * 진동하며 헤더 높이를 떨리게 만들기 때문
 * @param threshold 스크롤로 판정할 최소 거리 (px)
 * @return 스크롤 여부
 */
export const useScrolled = (threshold: number = SCROLL_THRESHOLD): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > threshold);
    };

    // 새로고침 시 브라우저가 스크롤 위치를 복원할 수 있어 마운트 시점에 한 번 판정
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};
