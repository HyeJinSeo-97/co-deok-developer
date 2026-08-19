import styles from "@/app/styles/modules/home-header.module.css";
import Image from "next/image";
import Link from "next/link";

import { GoGlobalSearchRouteButton } from "@/features/admin/go-global-search-page";
import { GoCartRouteButton } from "@/features/shopping-cart/go-cart-page";

export default function HomeHeader() {
  return (
    <header className={styles.header}>
      <Link href={"/home"} className={styles.logo}>
        <Image
          src={"/logo/logo.svg"}
          alt={"메인 로고"}
          width={105}
          height={24}
          // 헤더 로고는 첫 화면에 바로 보이는 LCP 후보라 priority 를 붙여 preload
          priority
        />
      </Link>

      <div className={styles.actions}>
        <GoGlobalSearchRouteButton />

        <GoCartRouteButton />
      </div>
    </header>
  );
}
