import type { ComponentType, SVGProps } from "react";
import Link from "next/link";

import { IconBrandKakaoTalk } from "@tabler/icons-react";

import type { OAuthProvider, OAuthProviderId } from "@/app/login/_model";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/shadcn/button";
import { NaverLogo } from "@/shared/ui/logos";

/** 제공자별 브랜드 마크 매핑 */
const LOGO_BY_ID: Record<
  OAuthProviderId,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  kakao: IconBrandKakaoTalk,
  naver: NaverLogo,
};

interface OAuthButtonProps {
  /** 그릴 OAuth 제공자 정보 */
  provider: OAuthProvider;
  /** 배치용 추가 클래스 (레이아웃을 담당하는 부모가 주입) */
  className?: string;
}

/**
 * OAuth 제공자 로그인 시작 버튼
 * 클릭 시 BFF 로그인 시작 경로로 이동하는 링크라 클라이언트 핸들러가 필요 없다
 * @param provider 그릴 OAuth 제공자 정보
 * @param className 배치용 추가 클래스
 */
export function OAuthButton({ provider, className }: OAuthButtonProps) {
  const Logo = LOGO_BY_ID[provider.id];

  return (
    <Link
      href={provider.href}
      className={cn(
        buttonVariants(),
        "h-12 w-full gap-2",
        provider.className,
        className,
      )}
    >
      <Logo className={"size-5"} />
      {provider.label}
    </Link>
  );
}
