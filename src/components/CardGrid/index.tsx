import { CardComponent } from "@/components/CardComponent";
import type { Card } from "@/types/card";
import styles from "./styles.module.css";

interface CardGridProps {
  cards: Card[];
}

export function CardGrid({ cards }: CardGridProps) {
  return (
    <div className={styles.cardsGrid}>
      {cards.map((card) => (
        <CardComponent
          key={card.id}
          id={card.id}
          name={card.name}
          types={card.types}
          typeColors={card.typeColors}
          image={card.image}
          hp={card.hp}
          attack={card.attack}
          defense={card.defense}
          isShiny={card.isShiny}
        />
      ))}
    </div>
  );
}
