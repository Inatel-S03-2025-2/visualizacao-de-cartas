import { UserDropdown } from "@/components/UserDropdown";
import styles from "./styles.module.css";
import logo from "@/assets/logo.png";
import { useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className={styles.container}>
      <div className={styles.headerContent}>
        <div className={styles.container_logo}>
          <img
            src={logo}
            alt="Logo"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          />
          <h1>Visualização de cartas</h1>
        </div>

        <UserDropdown />
      </div>
    </header>
  );
}
