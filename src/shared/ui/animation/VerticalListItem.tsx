"use client";

import type { ReactNode } from "react";

import { motion } from "motion/react";

// 2. 자식(개별 아이템) 애니메이션 설정
const itemVariants = {
  hidden: { opacity: 0, y: 20 }, // 아래에서 투명하게 시작
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100 }, // 부드러운 스프링 효과
  },
} as const;

interface VerticalListItemProps {
  children: ReactNode;

  className?: string;
}

/**
 * 세로 리스트 애니메이션 자식 컴포넌트
 * initial·animate 는 부모(VerticalList)가 전파하므로 여기서 지정하지 않음
 * @param children 아이템 내용
 * @param className 아이템에 적용할 클래스
 */
export function VerticalListItem({
  children,
  className,
}: VerticalListItemProps): ReactNode {
  return (
    <motion.li className={className} variants={itemVariants}>
      {children}
    </motion.li>
  );
}
