"use client";

import { useCallback } from "react";

import { useSearchStore } from "@/app/_stores";

interface UseSearchProductsInputResult {
  /** 입력한 검색어 */
  searchQuery: string;

  /** 검색어 입력 핸들러 */
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  /** 엔터 입력 처리 핸들러 */
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

/**
 * 검색어 입력 상태와 핸들러를 제공
 * 엔터 입력 시 검색어를 최근 검색어에 저장하고 입력값을 초기화
 */
export const useSearchProductsInput = (): UseSearchProductsInputResult => {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const inputSearchQuery = useSearchStore((state) => state.inputSearchQuery);
  const addSearch = useSearchStore((state) => state.addSearch);

  /**
   * 입력값을 스토어에 반영
   * @param event 입력 이벤트
   */
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      inputSearchQuery(event.target.value);
    },
    [inputSearchQuery],
  );

  /**
   * 엔터 입력 시 검색어를 스토어에 저장
   * @param event 키보드 이벤트
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>): void => {
      // 한글 입력 조합 중 엔터는 무시
      if (event.nativeEvent.isComposing) return;

      if (event.key !== "Enter") return;

      addSearch(searchQuery);
      inputSearchQuery("");
    },
    [searchQuery, addSearch, inputSearchQuery],
  );

  return { searchQuery, handleChange, handleKeyDown };
};
