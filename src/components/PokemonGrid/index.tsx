import { PokemonCard } from "@/components/PokemonCard";
import type { Pokemon } from "@/types/pokemon";
import styles from "./styles.module.css";

interface PokemonGridProps {
  pokemons: Pokemon[];
}

export function PokemonGrid({ pokemons }: PokemonGridProps) {
  return (
    <div className={styles.cardsGrid}>
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          types={pokemon.types}
          typeColor={pokemon.typeColor}
          image={pokemon.image}
          hp={pokemon.hp}
          attack={pokemon.attack}
          defense={pokemon.defense}
          generation={pokemon.generation}
          isShiny={pokemon.isShiny}
        />
      ))}
    </div>
  );
}
