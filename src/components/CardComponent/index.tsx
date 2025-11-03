import { useNavigate } from "react-router";
import { Sparkles } from "lucide-react";
import styles from "./styles.module.css";

interface CardComponentProps {
  id: number;
  name: string;
  types: string[];
  typeColors: string[];
  image: string;
  hp?: number;
  attack?: number;
  defense?: number;
  isShiny?: boolean;
}

export function CardComponent({
  id,
  name,
  types,
  typeColors,
  image,
  hp = 100,
  attack = 50,
  defense = 50,
  isShiny = false,
}: CardComponentProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/cards/detail/${id}`);
  };

  const formatId = (id: number) => {
    return `#${String(id).padStart(3, "0")}`;
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ borderColor: typeColors[0] }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.cardId}>{formatId(id)}</span>
        {isShiny && (
          <div className={styles.shinyBadge}>
            <Sparkles size={12} />
            SHINY
          </div>
        )}
      </div>

      <div className={styles.cardImageContainer}>
        <img src={image} alt={name} className={styles.cardImage} />
      </div>

      <div className={styles.cardInfo}>
        <h3 className={styles.cardName}>{name}</h3>

        <div className={styles.typeContainer}>
          {types.map((type, index) => (
            <span
              key={type}
              className={styles.cardType}
              style={{ backgroundColor: typeColors[index] }}
            >
              {type}
            </span>
          ))}
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>HP</span>
            <span className={styles.statValue}>{hp}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>ATK</span>
            <span className={styles.statValue}>{attack}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>DEF</span>
            <span className={styles.statValue}>{defense}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
