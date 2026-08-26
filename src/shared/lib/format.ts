/**
 * 조회수를 만/천 단위 축약 표기로 변환
 * @param viewCount 조회수 (회)
 * @return 축약된 조회수 문자열 (예: 12.8만회)
 */
export const formatViewCount = (viewCount: number): string => {
  if (viewCount >= 10000) return `${(viewCount / 10000).toFixed(1)}만회`;
  if (viewCount >= 1000) return `${(viewCount / 1000).toFixed(1)}천회`;

  return `${viewCount}회`;
};
