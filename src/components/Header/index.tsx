import { UserDropdown } from "@/components/UserDropdown";
import styles from "./styles.module.css";
import logo from "@/assets/logo.png";

export function Header() {
  return (
    <header className={styles.container}>
      <div className={styles.headerContent}>
        <div className={styles.container_logo}>
          <img src={logo} alt="Logo" />
          <h1>Visualização de cartas</h1>
        </div>

        <UserDropdown />
      </div>
    </header>
  );
}
