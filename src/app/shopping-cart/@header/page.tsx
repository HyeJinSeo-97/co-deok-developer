import { GoBackRouteButton } from "@/features/admin/go-back-page";
import { SHOPPING_CART_PAGE } from "@/shared/model";
import styles from "@/shared/styles/modules/home-header.module.css";

export default function ShoppingCartHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.goBackButton}>
        <GoBackRouteButton />
      </div>

      <div className={styles.logo}>
        <h1 className={"text-subtitle"}>{SHOPPING_CART_PAGE.label}</h1>
      </div>
    </header>
  );
}
