import { cn } from "@/shared/lib/utils";

export function ContentLayout({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  // 헤더가 차지한 높이를 뺀 나머지를 flex-1 로 채워야
  // 짧은 페이지에서도 스크롤 없이 화면에 꽉 참
  // min-h-0 은 flex 자식의 기본 min-height:auto 를 풀어야
  // overflow-y-auto 가 부모 높이를 넘지 않고 내부 스크롤됨
  return (
    <div
      className={cn(
        "min-h-0 w-full flex-1 overflow-y-auto px-4 bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}
