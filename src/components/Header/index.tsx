import styles from "./styles.module.css"
import logo from "@/assets/logo.png"

export function Header() {
  return (
    <header className={styles.container}>
      <div>
        <div className={styles.container_logo}>
          <img src={logo} alt="Logo" />
          <h1>Visualização de cartas</h1>
        </div>
      </div>
    </header>
    )
}
