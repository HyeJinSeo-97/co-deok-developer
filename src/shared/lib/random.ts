/**
 * 배열에서 중복 없이 무작위로 count 개를 추출
 * 부분 Fisher-Yates 셔플을 사용. sort(() => Math.random() - 0.5) 방식은
 * 비교 함수가 일관되지 않아 특정 순열이 더 자주 나오는 편향이 생김
 * @param items 원본 배열 (변경하지 않음)
 * @param count 추출할 개수
 * @return 무작위로 추출된 항목 배열
 */
export const pickRandomItems = <T>(items: readonly T[], count: number): T[] => {
  const copied = [...items];
  const size = Math.min(count, copied.length);

  for (let i = 0; i < size; i += 1) {
    const randomIndex = i + Math.floor(Math.random() * (copied.length - i));

    [copied[i], copied[randomIndex]] = [copied[randomIndex], copied[i]];
  }

  return copied.slice(0, size);
};

/**
 * 충돌 가능성이 사실상 없는 무작위 식별자를 생성
 * Web Crypto 기반이라 Math.random()과 달리 예측이 어려워
 * CSRF state처럼 추측되면 안 되는 값에도 쓸 수 있다
 * @return UUID v4 문자열
 */
export const createUuid = (): string => crypto.randomUUID();
