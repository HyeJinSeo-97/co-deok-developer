import type { ReactNode } from "react";

import { findMatchRanges } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";

interface SearchHighlightProps {
  /** 전체 텍스트 */
  text: string;

  /** 강조할 검색어 */
  keyword: string;

  /** 강조 영역(mark)에 적용할 클래스 */
  className?: string;
}

/**
 * 텍스트에서 검색어와 일치하는 부분을 강조 표시
 * 자음(ㄱ~ㅎ)만 입력한 경우 초성 검색으로 동작
 * @param text 전체 텍스트
 * @param keyword 강조할 검색어
 * @param className 강조 영역에 적용할 클래스
 */
export function SearchHighlight({
  text,
  keyword,
  className,
}: SearchHighlightProps): ReactNode {
  const ranges = findMatchRanges(text, keyword);

  // 일치 구간이 없으면 원본 텍스트를 그대로 노출
  if (ranges.length === 0) return text;

  const chunks: ReactNode[] = [];

  let lastIndex = 0;

  ranges.forEach(({ index, length }) => {
    // 일치 구간 앞의 일반 텍스트
    if (index > lastIndex) chunks.push(text.slice(lastIndex, index));

    chunks.push(
      <mark
        key={index}
        className={cn("bg-transparent text-primary font-semibold", className)}
      >
        {text.slice(index, index + length)}
      </mark>,
    );

    lastIndex = index + length;
  });

  // 마지막 일치 구간 뒤의 남은 텍스트
  if (lastIndex < text.length) chunks.push(text.slice(lastIndex));

  return chunks;
}
