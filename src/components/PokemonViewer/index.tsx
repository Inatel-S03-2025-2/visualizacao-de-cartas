import type { Pokemon } from "@/types/pokemon";
import styles from "./styles.module.css";

export function PokemonViewer() {

  const currentPokemon = {
    name: "Pokemon",
    type: "Electric",
    typeColor: "#FFD700",
    hp: 100,
    image:
      "https://i.pinimg.com/736x/f2/fb/4f/f2fb4f9c1cb461c86b8f38140b453b44.jpg",
    attack: "Thunderbolt",
    damage: 100,
    rarity: "Common",
  };

  return (
    <>
      <div className={styles.viewerContent}>
        
        <button className={styles.navButton} aria-label="Previous card">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        
        <div
          className={styles.card}
          style={{ borderColor: currentPokemon.typeColor }}
        >
          <div className={styles.cardContent}>
            {/* Card Header */}
            <div className={styles.cardHeader}>
              <div>
                <h2 className={styles.pokemonName}>{currentPokemon.name}</h2>
                <p
                  className={styles.pokemonType}
                  style={{ color: currentPokemon.typeColor }}
                >
                  {currentPokemon.type}
                </p>
              </div>
              <div
                className={styles.hpBadge}
                style={{ backgroundColor: currentPokemon.typeColor }}
              >
                HP {currentPokemon.hp}
              </div>
            </div>

            
            <div className={styles.imageContainer}>
              <img
                src={currentPokemon.image || "/placeholder.svg"}
                alt={currentPokemon.name}
                className={styles.pokemonImage}
              />
            </div>

            
            <div className={styles.cardInfo}>
              <div className={styles.attackBox}>
                <div className={styles.attackHeader}>
                  <span className={styles.attackName}>
                    {currentPokemon.attack}
                  </span>
                  <span
                    className={styles.damageBadge}
                    style={{ backgroundColor: currentPokemon.typeColor }}
                  >
                    {currentPokemon.damage}
                  </span>
                </div>
                <p className={styles.attackDescription}>
                  A powerful attack that deals massive damage to the opponent.
                </p>
              </div>

              <div className={styles.rarityBox}>
                <span className={styles.rarityLabel}>Rarity</span>
                <span className={styles.rarityValue}>
                  {currentPokemon.rarity}
                </span>
              </div>
            </div>
          </div>
        </div>

        
        <button className={styles.navButton} aria-label="Next card">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </>
  );
}
