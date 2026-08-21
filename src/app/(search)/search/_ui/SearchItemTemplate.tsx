import { Card, CardContent, CardTitle } from "@/shared/shadcn/card";

interface SearchItemTemplateProps {
  icon?: React.ElementType;

  title: string;

  actions?: React.ReactNode;

  children: React.ReactNode;
}

export function SearchItemTemplate({
  icon: Icon,
  title,
  actions,
  children,
}: SearchItemTemplateProps) {
  return (
    <Card>
      <CardContent>
        <CardTitle className={"flex items-center justify-between"}>
          <span
            className={
              "inline-flex items-center text-label font-semibold gap-2"
            }
          >
            {Icon && <Icon size={20} />}
            {title}
          </span>

          {actions}
        </CardTitle>

        <div className={"py-2"}>{children}</div>
      </CardContent>
    </Card>
  );
}
