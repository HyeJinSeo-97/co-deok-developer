/**
 * 로그인 화면 레이아웃
 * 로그인은 단독 화면이라 카드가 뷰포트 높이를 채우도록 flex 기준을 만든다
 * min-h-dvh는 확정 높이가 아니어서 자식의 h-full이 늘어나지 않으므로,
 * 자식(카드)은 h-full 대신 flex-1로 남은 공간을 채운다
 */
export default function LoginLayout({ children }: LayoutProps<"/login">) {
  return <div className={"flex min-h-dvh w-full flex-col"}>{children}</div>;
}
