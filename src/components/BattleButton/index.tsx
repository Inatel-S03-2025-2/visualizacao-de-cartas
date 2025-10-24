import styles from "./styles.module.css";

interface BattleButtonProps {
  onClick: () => void;
}

export function BattleButton({ onClick }: BattleButtonProps) {
  return (
    <button className={styles.battleButton} onClick={onClick}>
      <span className={styles.icon}>⚔️</span>
      <span className={styles.text}>Batalhar</span>
    </button>
  );
}
