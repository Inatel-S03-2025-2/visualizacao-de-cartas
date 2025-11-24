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
  const [error, setError] = useState<string | null>(null);

  const loadCards = async () => {
    setLoading(true);
    setError(null);

    try {
      const userCards = await CardController.fetchCardsByUserId("user-1");
      setCards(userCards);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao carregar cartas";
      console.error("Erro ao carregar cartas:", error);
      setError(errorMessage);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Carregando cartas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
          <div className={styles.errorContainer}>
            <div className={styles.errorIcon}>⚠️</div>
            <h2 className={styles.errorTitle}>Erro ao carregar cartas</h2>
            <p className={styles.errorMessage}>{error}</p>
            <button className={styles.retryButton} onClick={loadCards}>
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        {cards.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>
            Nenhuma carta encontrada
          </p>
        ) : (
          <CardGrid cards={cards} />
        )}
        <div className={styles.actionButtons}>
          <BattleButton onClick={handleBattleClick} />
          <TradeButton onClick={handleTradeClick} />
        </div>
      </div>
    </div>
  );
}
