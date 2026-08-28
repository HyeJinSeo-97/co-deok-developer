import { GoBackRouteButton } from "@/features/admin/go-back-page";
import { GoCartRouteButton } from "@/features/shopping-cart/go-cart-page";
import { SEARCH_PAGE } from "@/shared/model";
import styles from "@/shared/styles/modules/home-header.module.css";

export default function SearchHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.goBackButton}>
        <GoBackRouteButton />
      </div>

      <div className={styles.logo}>
        <h1 className={"text-subtitle"}>{SEARCH_PAGE.label}</h1>
      </div>

      <div className={styles.actions}>
        <GoCartRouteButton />
      </div>
    </header>
  );
}
