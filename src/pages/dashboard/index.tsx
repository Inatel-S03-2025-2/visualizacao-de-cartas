import { PokemonGrid } from "@/components/PokemonGrid";
import { BattleButton } from "@/components/BattleButton";
import { TradeButton } from "@/components/TradeButton";
import { mockPokemons } from "@/data/mockPokemons";
import styles from "./styles.module.css";

export function DashboardPage() {
  const handleBattleClick = () => {
    alert("Funcionalidade de batalha em desenvolvimento!");
  };

  const handleTradeClick = () => {
    alert("Funcionalidade de trocas em desenvolvimento!");
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <PokemonGrid pokemons={mockPokemons} />
        <div className={styles.actionButtons}>
          <BattleButton onClick={handleBattleClick} />
          <TradeButton onClick={handleTradeClick} />
        </div>
      </div>
    </div>
  );
}
