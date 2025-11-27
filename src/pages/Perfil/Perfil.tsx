import React, { useEffect, useState } from "react";
import styles from "./Perfil.module.css";

import { useAuth } from "@/hooks/useAuth";
import { CardController } from "@/controllers/CardController";
import type { Card } from "@/types/card";

export default function Perfil() {
  const { user } = useAuth();
  const [playerPokemons, setPlayerPokemons] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  const player = {
    name: "Ash Ketchum",
    email: "ash@pallet.com",
    victories: 128,
    defeats: 45,
    favoritePokemon: "Pikachu",
    avatar:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
  };

  useEffect(() => {
    async function loadUserPokemons() {
      try {
        setLoading(true);

        const userId = user?.id ?? "1"; 
        const cards = await CardController.fetchCardsByUserId(userId);

        console.log("POKÉMONS DO USUÁRIO:", cards);

        setPlayerPokemons(cards.slice(0, 5)); // mostra 5
      } catch (error) {
        console.error("Erro ao carregar pokémons:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserPokemons();
  }, [user]);

  return (
    <div className={styles.pageBackground}>
      <div className={styles.profileContainer}>

        {/* LADO ESQUERDO */}
        <div className={styles.leftCard}>
          <img src={player.avatar} className={styles.avatar} />

          <h2>{player.name}</h2>
          <p className={styles.email}>{player.email}</p>

          <div className={styles.infoBox}>
            <strong>Vitórias:</strong> {player.victories}
          </div>

          <div className={styles.infoBox}>
            <strong>Derrotas:</strong> {player.defeats}
          </div>

          <div className={styles.infoBox}>
            <strong>Pokémon preferido:</strong>{" "}
            <span className={styles.favoritePokemon}>
              {player.favoritePokemon}
            </span>
          </div>
        </div>

        {/* LADO DIREITO */}
        <div className={styles.rightContent}>
          <h2 className={styles.sectionTitle}>Meus Pokémons</h2>

          {loading ? (
            <p>Carregando pokémons do jogador...</p>
          ) : playerPokemons.length === 0 ? (
            <p>Nenhum Pokémon encontrado.</p>
          ) : (
            <div className={styles.pokemonGrid}>
              {playerPokemons.map((poke) => (
                <div key={poke.id} className={styles.pokemonCard}>
                  <img
                    src={poke.image}
                    alt={poke.name}
                    className={styles.pokemonImage}
                  />
                  <h3>{poke.name}</h3>
                  <p>Pokémons derrotados: {poke.attack}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
