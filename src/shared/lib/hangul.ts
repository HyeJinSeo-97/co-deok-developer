import { canBeChoseong, getChoseong } from "es-hangul";

/** 문자열에서 찾은 일치 구간 */
export interface MatchRange {
  /** 일치가 시작되는 위치 */
  index: number;

  /** 일치한 길이 */
  length: number;
}

/**
 * 검색어가 초성만으로 구성됐는지 판별 (공백은 허용)
 * @param query 검색어
 */
const isChoseongQuery = (query: string): boolean =>
  [...query].every((char) => char === " " || canBeChoseong(char));

/**
 * 텍스트에서 검색어와 일치하는 모든 구간을 탐색
 * 검색어가 초성(ㄱ~ㅎ)으로만 이뤄지면 초성 검색, 그 외에는 일반 부분 문자열 검색
 * `keepNonHangul` 로 초성 변환 시 길이가 보존되므로 일치 위치를 원본 문자열에 그대로 사용
 * @param text 대상 텍스트
 * @param query 검색어
 */
export const findMatchRanges = (text: string, query: string): MatchRange[] => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) return [];

  const isChoseong = isChoseongQuery(trimmedQuery);

  const target = isChoseong
    ? getChoseong(text, { keepNonHangul: true })
    : text.toLowerCase();
  const keyword = isChoseong ? trimmedQuery : trimmedQuery.toLowerCase();

  const ranges: MatchRange[] = [];

  let fromIndex = 0;

  while (fromIndex <= target.length - keyword.length) {
    const index = target.indexOf(keyword, fromIndex);

    if (index === -1) break;

    ranges.push({ index, length: keyword.length });

    fromIndex = index + keyword.length;
  }

  return ranges;
};
