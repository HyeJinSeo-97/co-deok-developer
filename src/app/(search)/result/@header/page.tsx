import styles from "@/app/_styles/modules/home-header.module.css";
import { GoBackRouteButton } from "@/features/admin/go-back-route";
import { GoCartRouteButton } from "@/features/shopping-cart/go-cart-route";
import { SEARCH_RESULT_PAGE } from "@/shared/model";

export default function SearchResultHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.goBackButton}>
        <GoBackRouteButton />
      </div>

      <div className={styles.logo}>
        <h1 className={"text-subtitle"}>{SEARCH_RESULT_PAGE.label}</h1>
      </div>

      <div className={styles.actions}>
        <GoCartRouteButton />
      </div>
    </header>
  );
}
