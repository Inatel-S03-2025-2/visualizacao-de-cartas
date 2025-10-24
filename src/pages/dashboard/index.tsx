import { useState } from "react";
import { PokemonCard } from "@/components/PokemonCard";
import styles from "./styles.module.css";

// Dados mockados para demonstração
const mockPokemons = [
  {
    id: 1,
    name: "Pikachu",
    type: "Electric",
    typeColor: "#FFD700",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  },
  {
    id: 2,
    name: "Charizard",
    type: "Fire",
    typeColor: "#FF4500",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
  },
  {
    id: 3,
    name: "Blastoise",
    type: "Water",
    typeColor: "#1E90FF",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
  },
  {
    id: 4,
    name: "Venusaur",
    type: "Grass",
    typeColor: "#32CD32",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
  },
  {
    id: 5,
    name: "Gengar",
    type: "Ghost",
    typeColor: "#9370DB",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
  },
];

export function DashboardPage() {
  const [pokemons] = useState(mockPokemons);

  const handleBattleClick = () => {
    alert("Funcionalidade de batalha em desenvolvimento!");
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        {pokemons.length > 0 ? (
          <>
            <div className={styles.cardsGrid}>
              {pokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  type={pokemon.type}
                  typeColor={pokemon.typeColor}
                  image={pokemon.image}
                />
              ))}
            </div>
            <div className={styles.battleSection}>
              <button
                className={styles.battleButton}
                onClick={handleBattleClick}
              >
                Batalha
              </button>
            </div>
          </>
        ) : (
          <div className={styles.emptyState}>
            <h2>Nenhuma carta disponível</h2>
            <p>Suas cartas Pokémon aparecerão aqui</p>
          </div>
        )}
      </div>
    </div>
  );
}
