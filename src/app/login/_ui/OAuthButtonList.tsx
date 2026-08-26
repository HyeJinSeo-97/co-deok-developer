import { OAUTH_PROVIDERS } from "@/app/login/_model";

import { OAuthButton } from "./OAuthButton";

/**
 * 지원하는 OAuth 제공자 로그인 버튼 목록
 * 모바일에서는 세로로 쌓고, sm 이상에서는 가로로 1:1 균등 배치한다
 */
export function OAuthButtonList() {
  return (
    <div className={"flex flex-col gap-3"}>
      {OAUTH_PROVIDERS.map((provider) => (
        <OAuthButton key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
