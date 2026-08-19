import styles from "@/app/styles/modules/home-header.module.css";

import { SHOPPING_CART_PAGE } from "@/shared/model";

export default function ShoppingCartHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <h1 className={"text-subtitle"}>{SHOPPING_CART_PAGE.label}</h1>
      </div>
    </header>
  );
}
