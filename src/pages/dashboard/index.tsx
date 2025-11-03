import { useState, useEffect } from "react";
import { CardGrid } from "@/components/CardGrid";
import { BattleButton } from "@/components/BattleButton";
import { TradeButton } from "@/components/TradeButton";
import { CardController } from "@/controllers/CardController";
import type { Card } from "@/types/card";
import styles from "./styles.module.css";

export function DashboardPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCards() {
      try {
        const userCards = await CardController.fetchCardsByUserId("user-1");
        setCards(userCards);
      } catch (error) {
        console.error("Erro ao carregar cartas:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCards();
  }, []);

  const handleBattleClick = () => {
    alert("Funcionalidade de batalha em desenvolvimento!");
  };

  const handleTradeClick = () => {
    alert("Funcionalidade de trocas em desenvolvimento!");
  };

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
          <p style={{ color: "white" }}>Carregando cartas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <CardGrid cards={cards} />
        <div className={styles.actionButtons}>
          <BattleButton onClick={handleBattleClick} />
          <TradeButton onClick={handleTradeClick} />
        </div>
      </div>
    </div>
  );
}
