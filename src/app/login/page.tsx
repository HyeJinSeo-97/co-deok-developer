import { resolveLoginError } from "@/app/login/_model";
import { LoginErrorNotice, OAuthButtonList } from "@/app/login/_ui";
import { Card, CardContent, CardHeader } from "@/shared/shadcn/card";
import { ServiceLogo } from "@/shared/ui/logos";

/**
 * 로그인 화면
 * OAuth 라우트가 실패 시 `/login?error=...`로 되돌려 보내므로
 * 쿼리를 읽어 실패 안내를 함께 노출한다
 */
export default async function LoginRootPage({
  searchParams,
}: PageProps<"/login">) {
  // 쿼리 키는 클라이언트가 임의로 붙일 수 있어 값이 없을 수 있다
  const { error, reason } = await searchParams;
  const loginError = resolveLoginError(
    typeof error === "string" ? error : undefined,
  );

  return (
    <Card
      variant={"transparent"}
      className={"w-full max-w-xl px-4 gap-20 m-auto"}
    >
      <CardHeader>
        <ServiceLogo className={"mx-auto"} />
      </CardHeader>

      <CardContent className={"flex flex-col gap-6"}>
        {loginError && (
          <LoginErrorNotice
            error={loginError}
            reason={typeof reason === "string" ? reason : undefined}
          />
        )}

        <OAuthButtonList />
      </CardContent>
    </Card>
  );
}
