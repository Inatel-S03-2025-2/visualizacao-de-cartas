import styles from "./styles.module.css";

interface TradeButtonProps {
  onClick: () => void;
}

export function TradeButton({ onClick }: TradeButtonProps) {
  return (
    <button className={styles.tradeButton} onClick={onClick}>
      <span className={styles.icon}>🔄</span>
      <span className={styles.text}>Trocar</span>
    </button>
  );
}
