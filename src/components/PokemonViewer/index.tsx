import { useParams } from "react-router";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { typeColor } from "@/consts/type-color";
import type { Card, MoveDetails } from "@/types/card";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { CardController } from "@/controllers/CardController";

type Params = {
  id: string;
};

export function PokemonViewer() {
  const params = useParams<Params>();
  const [pokemonData, setPokemonData] = useState<Card>();
  const [moveData, setMoveData] = useState<MoveDetails | null>(null);
  const [viewIndex, setViewIndex] = useState<number>(0);

  const fetchData = async (id: string) => {
    if (!id) return;
    try {
      const pokemon = await CardController.getCardById(id);
      setViewIndex(0);
      setPokemonData(pokemon);
    } catch (err) {
      console.error("Erro ao obter carta pelo CardController:", err);
      setPokemonData(undefined);
    }
  };

  const getTypeColor = (typeName?: string) => {
    const key = typeName as unknown as keyof typeof typeColor | undefined;
    return (key && typeColor[key]) ?? "#777"; // fallback neutro se não encontrar
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
    const moveName = pokemonData.moves?.[viewIndex];
    
    if (!moveName) {
      setMoveData(null);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const url = `https://pokeapi.co/api/v2/move/${moveName}`;
        const data = await fetchMoves(url);
        if (!cancelled) setMoveData(data);
      } catch (err) {
        console.error("Erro ao buscar move:", err);
        if (!cancelled) setMoveData(null);
      }
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
            getTypeColor(pokemonData.types[0])

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
                    getTypeColor(pokemonData.types[0])
                  }}
                >
                  <div className={styles.typesContent}>
                    {pokemonData.types.map((type, index) => (
                    <span
                      key={type}
                      className={styles.typeBadge}
                      style={{ backgroundColor: getTypeColor(pokemonData.types[index]) }}
                    >
                      {type}
                    </span>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={styles.hpBadge}
                style={{
                  backgroundColor:
                    getTypeColor(pokemonData.types[0])
                }}
              >
                HP {pokemonData.hp}
              </div>
            </div>

            <div className={styles.imageContainer}>
              <img
                src={
                  pokemonData.image || ""
                }
                alt={pokemonData.name}
                className={styles.pokemonImage}
              />
            </div>

            <div className={styles.statsContent}>
              <div 
                className={styles.statBadge} 
                style={{ border: "2px solid #f07f2f", color: '#f7ab79'}}
              >
                <span>ATK</span>
                <span>{pokemonData.attack}</span>
              </div>
              <div 
                className={styles.statBadge} 
                style={{ border: "2px solid #f8d032", color: '#f8e17b'}}
              >
                <span>DEF</span>
                <span>{pokemonData.defense}</span>
              </div>
              <div 
                className={styles.statBadge} 
                style={{ border: "2px solid #6890f0", color: '#a0b6f0'}}
              >
                <span>Sp. ATK</span>
                <span>{pokemonData.specialAttack}</span>
              </div>
              <div 
                className={styles.statBadge} 
                style={{ border: "2px solid #78c84f", color: '#a7dc8e'}}
              >
                <span>Sp. DEF</span>
                <span>{pokemonData.specialDefense}</span>
              </div>
              <div 
                className={styles.statBadge} 
                style={{ border: "2px solid #f55988", color: '#f893b1'}}
              >
                <span>SPD</span>
                <span>{pokemonData.speed}</span>
              </div>
            </div>

            <div className={styles.cardInfo}>
              <div className={styles.cardAttack}>
                <button className={styles.buttonArrow} onClick={handleBack}>
                  <ChevronsLeft />
                </button>
                <div className={styles.attackBox}>
                  <div className={styles.attackHeader}>
                    <span className={styles.attackName}>
                      {(pokemonData.moves?.[viewIndex] || '')
                        .charAt(0)
                        .toLocaleUpperCase() +
                        (pokemonData.moves?.[viewIndex].slice(1) || '')}
                    </span>
                    {moveData?.power && (
                      <span
                        className={styles.damageBadge}
                        style={{
                          backgroundColor:
                            getTypeColor(pokemonData.types[0])
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
