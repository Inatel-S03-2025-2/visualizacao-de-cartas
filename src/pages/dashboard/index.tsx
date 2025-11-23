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
          <p style={{ color: "white", textAlign: "center" }}>
            Carregando cartas...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.mainContent}>
          <div
            style={{
              textAlign: "center",
              color: "white",
              padding: "2rem",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>Erro ao carregar cartas</h2>
            <p style={{ marginBottom: "1.5rem", opacity: 0.8 }}>{error}</p>
            <button
              onClick={loadCards}
              style={{
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
                transition: "transform 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
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
