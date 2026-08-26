import type { SVGProps } from "react";

/**
 * 네이버 브랜드 마크
 * @tabler/icons-react에 네이버 아이콘이 없어 직접 정의한다
 * 색은 currentColor를 따르므로 사용하는 쪽에서 text-* 로 지정한다
 */
export function NaverLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox={"0 0 24 24"}
      fill={"currentColor"}
      aria-hidden={"true"}
      focusable={"false"}
      {...props}
    >
      <path
        d={
          "M14.2 12.36 9.53 5.5H5.5v13h4.3v-6.86l4.67 6.86h4.03v-13h-4.3v6.86Z"
        }
      />
    </svg>
  );
}
