import { useParams } from "react-router";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { typeColor } from "@/consts/type-color";
import type { GetSpecificPokemonResponse, MoveDetails } from "@/types/card";
import { ChevronsLeft, ChevronsRight, Divide } from "lucide-react";

type Params = {
  id: string;
};

export function PokemonViewer() {
  const params = useParams<Params>();
  const [pokemonData, setPokemonData] = useState<GetSpecificPokemonResponse>();
  const [moveData, setMoveData] = useState<MoveDetails | null>(null);
  const [viewIndex, setViewIndex] = useState<number>(0);

  const fetchData = async (id: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const res: GetSpecificPokemonResponse = await response.json();

    setViewIndex(0);

    setPokemonData(res);
  };

  const fetchMoves = async (url: string) => {
    const response = await fetch(url);
    const res = await response.json();
    return res;
  };

  useEffect(() => {
    fetchData(params.id || "");
  }, [params.id]);

  const handleBack = () => {
    if (viewIndex == 0) {
      setViewIndex(2);
      return;
    }

    setViewIndex((prev) => prev - 1);
  };

  const handleAdvance = () => {
    if (viewIndex === 2) {
      setViewIndex(0);
      return;
    }

    setViewIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (!pokemonData) return;
    const url = pokemonData.moves[viewIndex]?.move.url;
    if (!url) return;

    let cancelled = false;
    (async () => {
      const data = await fetchMoves(url);
      if (!cancelled) setMoveData(data);
    })();

    return () => {
      cancelled = true;
    };
  }, [pokemonData, viewIndex]);

  if (!pokemonData) return null;

  return (
    <>
      <div className={styles.viewerContent}>
        <button className={styles.navButton}>
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
          style={{
            borderColor:
              typeColor[
                pokemonData.types[0].type
                  .name as unknown as keyof typeof typeColor
              ],
          }}
        >
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <div className={styles.headerContent}>
                <h2 className={styles.pokemonName}>
                  {pokemonData.name.charAt(0).toLocaleUpperCase() +
                    pokemonData.name.slice(1)}
                </h2>
                <div
                  className={styles.pokemonType}
                  style={{
                    color:
                      typeColor[
                        pokemonData.types[0].type
                          .name as unknown as keyof typeof typeColor
                      ],
                  }}
                >
                  <div className={styles.typesContent}>
                    {pokemonData.types.map((type, index: number) => (
                      <div
                        className={styles.typeBadge}
                        style={{
                          backgroundColor:
                            typeColor[
                              pokemonData.types[0].type
                                .name as unknown as keyof typeof typeColor
                            ],
                        }}
                        key={index}
                      >
                        {type.type.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={styles.hpBadge}
                style={{
                  backgroundColor:
                    typeColor[
                      pokemonData.types[0].type
                        .name as unknown as keyof typeof typeColor
                    ],
                }}
              >
                HP {pokemonData.stats[0].base_stat}
              </div>
            </div>

            <div className={styles.imageContainer}>
              <img
                src={
                  pokemonData.sprites.other["official-artwork"].front_default
                }
                alt={pokemonData.name}
                className={styles.pokemonImage}
              />
            </div>

            <div className={styles.cardInfo}>
              <div className={styles.cardAttack}>
                <button className={styles.buttonArrow} onClick={handleBack}>
                  <ChevronsLeft />
                </button>
                <div className={styles.attackBox}>
                  <div className={styles.attackHeader}>
                    <span className={styles.attackName}>
                      {pokemonData.moves[viewIndex].move.name
                        .charAt(0)
                        .toLocaleUpperCase() +
                        pokemonData.moves[viewIndex].move.name.slice(1)}
                    </span>
                    {moveData?.power && (
                      <span
                        className={styles.damageBadge}
                        style={{
                          backgroundColor:
                            typeColor[
                              pokemonData.types[0].type
                                .name as unknown as keyof typeof typeColor
                            ],
                        }}
                      >
                        Power {moveData?.power}
                      </span>
                    )}
                  </div>
                  <p className={styles.attackDescription}>
                    {moveData?.effect_entries[0].effect}
                  </p>
                </div>

                <button className={styles.buttonArrow} onClick={handleAdvance}>
                  <ChevronsRight />
                </button>
              </div>

              <div className={styles.rarityBox}>
                <span className={styles.rarityLabel}>Rarity</span>
                <span className={styles.rarityValue}></span>
              </div>
            </div>
          </div>
        </div>

        <button className={styles.navButton}>
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
