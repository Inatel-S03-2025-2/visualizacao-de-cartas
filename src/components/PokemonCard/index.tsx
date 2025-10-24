import { useNavigate } from "react-router";
import { Sparkles } from "lucide-react";
import styles from "./styles.module.css";

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  typeColor: string;
  image: string;
  hp?: number;
  attack?: number;
  defense?: number;
  isShiny?: boolean;
  generation?: number;
}

export function PokemonCard({
  id,
  name,
  types,
  typeColor,
  image,
  hp = 100,
  attack = 50,
  defense = 50,
  isShiny = false,
  generation,
}: PokemonCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/cards/detail/${id}`);
  };

  const formatId = (id: number) => {
    return `#${String(id).padStart(3, "0")}`;
  };

  return (
    <div
      className={styles.pokemonCard}
      onClick={handleClick}
      style={{ borderColor: typeColor }}
    >
      <div className={styles.cardHeader}>
        <span className={styles.pokemonId}>{formatId(id)}</span>
        {isShiny && (
          <div className={styles.shinyBadge}>
            <Sparkles size={12} />
            SHINY
          </div>
        )}
      </div>

      <div className={styles.cardImageContainer}>
        {generation && (
          <div className={styles.generationBadge}>Gen {generation}</div>
        )}
        <img src={image} alt={name} className={styles.cardImage} />
      </div>

      <div className={styles.cardInfo}>
        <h3 className={styles.pokemonName}>{name}</h3>

        <div className={styles.typeContainer}>
          {types.map((type) => (
            <span
              key={type}
              className={styles.pokemonType}
              style={{ backgroundColor: typeColor }}
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
