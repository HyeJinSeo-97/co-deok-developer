import { SajuProfileForm } from "@/app/onboarding/_ui";
import { Card, CardContent, CardHeader } from "@/shared/shadcn/card";

/**
 * 사용자 추가 정보 입력 화면
 * 홈의 "추천 상품 보기"를 눌러 진입한다.
 * 자동 리다이렉트 게이트를 두지 않아, 이미 입력한 사용자도 값을 다시 고칠 수 있다
 */
export default function OnboardingPage() {
  return (
    <div className={"flex min-h-dvh w-full flex-col"}>
      <Card
        variant={"transparent"}
        className={"m-auto w-full max-w-xl gap-8 px-4"}
      >
        <CardHeader className={"flex flex-col gap-2"}>
          <h1 className={"text-2xl font-bold"}>추가 정보를 입력해 주세요</h1>
          <p className={"text-sm text-muted-foreground"}>
            맞춤 상품을 추천하려면 몇 가지 정보가 더 필요합니다. 태어난 시를
            모르면 &quot;모름&quot;을 선택해도 됩니다.
          </p>
        </CardHeader>

        <CardContent>
          <SajuProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}
