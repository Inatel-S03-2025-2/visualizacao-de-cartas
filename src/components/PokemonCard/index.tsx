import { useNavigate } from "react-router";
import styles from "./styles.module.css";

interface PokemonCardProps {
  id: number;
  name: string;
  type: string;
  typeColor: string;
  image: string;
}

export function PokemonCard({
  id,
  name,
  type,
  typeColor,
  image,
}: PokemonCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/cards/detail/${id}`);
  };

  return (
    <div
      className={styles.pokemonCard}
      onClick={handleClick}
      style={{ borderColor: typeColor }}
    >
      <img src={image} alt={name} className={styles.cardImage} />
      <div className={styles.cardInfo}>
        <h3 className={styles.pokemonName}>{name}</h3>
        <p className={styles.pokemonType} style={{ color: typeColor }}>
          {type}
        </p>
      </div>
    </div>
  );
}
