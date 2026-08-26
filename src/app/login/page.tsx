import { OAuthButtonList } from "@/app/login/_ui";
import { Card, CardContent, CardHeader } from "@/shared/shadcn/card";
import { ServiceLogo } from "@/shared/ui/logos";

export default function LoginRootPage() {
  return (
    <Card
      variant={"transparent"}
      className={"w-full max-w-xl px-4 gap-20 m-auto"}
    >
      <CardHeader>
        <ServiceLogo className={"mx-auto"} />
      </CardHeader>

      <CardContent>
        <OAuthButtonList />
      </CardContent>
    </Card>
  );
}
