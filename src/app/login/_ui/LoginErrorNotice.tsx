import { IconAlertCircle } from "@tabler/icons-react";

import type { LoginErrorMessage } from "@/app/login/_model";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/shared/shadcn/item";

interface LoginErrorNoticeProps {
  /** 보여줄 실패 안내 문구 */
  error: LoginErrorMessage;
  /** 개발 환경에서만 노출할 원인 상세 (토큰 교환 실패 등) */
  reason?: string;
}

/**
 * 로그인 실패 사유 안내 배너
 * 버튼 위에 배치해 사용자가 재시도 지점을 바로 찾을 수 있게 한다
 * @param error 보여줄 실패 안내 문구
 * @param reason 개발 환경에서만 노출할 원인 상세
 */
export function LoginErrorNotice({ error, reason }: LoginErrorNoticeProps) {
  return (
    <Item
      variant={"outline"}
      role={"alert"}
      className={"items-start border-destructive/30 bg-destructive/5"}
    >
      <ItemMedia variant={"icon"} className={"text-destructive"}>
        <IconAlertCircle aria-hidden={true} />
      </ItemMedia>

      <ItemContent>
        {/* 기본 line-clamp-1은 안내 문구를 잘라내므로 해제 */}
        <ItemTitle className={"line-clamp-none font-bold text-destructive"}>
          {error.title}
        </ItemTitle>

        <ItemDescription className={"line-clamp-none"}>
          {error.description}
        </ItemDescription>

        {/* 원인 상세는 운영에서 사용자에게 의미가 없고 내부 정보가 드러날 수 있어 개발 환경에서만 */}
        {reason && process.env.NODE_ENV !== "production" && (
          <ItemDescription
            className={"line-clamp-none font-mono text-xs break-all"}
          >
            {reason}
          </ItemDescription>
        )}
      </ItemContent>
    </Item>
  );
}
