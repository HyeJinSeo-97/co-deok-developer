"use client";

import type { ReactNode } from "react";

import { motion } from "motion/react";

// 1. 부모(리스트 전체) 애니메이션 설정
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // 자식 요소들이 0.1초 간격으로 순서대로 나타남
      staggerChildren: 0.1,
    },
  },
};

interface VerticalListProps {
  children: ReactNode;

  className?: string;
}

/**
 * 세로 리스트 애니메이션 부모 컴포넌트
 * @param children VerticalListItem 목록
 * @param className 리스트에 적용할 클래스
 */
export function VerticalList({
  children,
  className,
}: VerticalListProps): ReactNode {
  return (
    <motion.ul
      className={className}
      variants={listVariants}
      initial={"hidden"}
      animate={"visible"}
    >
      {children}
    </motion.ul>
  );
}
