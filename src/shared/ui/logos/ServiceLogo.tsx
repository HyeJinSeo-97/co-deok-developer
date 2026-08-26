import Image from "next/image";

import { cn } from "@/shared/lib/utils";

/** 서비스 로고 이미지 경로 */
const SERVICE_LOGO_SRC = "/logo/logo.svg";

/** 서비스 로고 기본 가로 크기 (px) */
const SERVICE_LOGO_WIDTH = 105;

/** 서비스 로고 기본 세로 크기 (px) */
const SERVICE_LOGO_HEIGHT = 24;

interface ServiceLogoProps {
  /** 로고 가로 크기 (px) */
  width?: number;
  /** 로고 세로 크기 (px) */
  height?: number;
  /**
   * 첫 화면에 바로 보이는 위치면 true — LCP 후보이므로 preload
   * 스크롤해야 보이는 위치에서는 켜지 않음
   */
  priority?: boolean;
  className?: string;
}

/**
 * 서비스 메인 로고 이미지
 * @param width 로고 가로 크기 (px)
 * @param height 로고 세로 크기 (px)
 * @param priority LCP 후보일 때 preload 여부
 */
export function ServiceLogo({
  width = SERVICE_LOGO_WIDTH,
  height = SERVICE_LOGO_HEIGHT,
  priority = false,
  className,
}: ServiceLogoProps) {
  return (
    <Image
      src={SERVICE_LOGO_SRC}
      alt={"메인 로고"}
      width={width}
      height={height}
      priority={priority}
      className={cn(className)}
    />
  );
}
