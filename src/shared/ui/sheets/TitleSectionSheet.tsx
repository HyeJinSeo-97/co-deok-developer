import { ComponentProps } from "react";

import { cn } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/shadcn/card";

interface TitleSectionSheetProps {
  title: string;

  className?: string;

  children: React.ReactNode;
}

export function TitleSectionSheet({
  title,
  variant,
  className,
  children,
}: TitleSectionSheetProps & ComponentProps<typeof Card>) {
  return (
    <Card variant={variant} className={cn(className)}>
      <CardHeader>
        <CardTitle>
          <h4 className={"text-subtitle font-extrabold"}>{title}</h4>
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
