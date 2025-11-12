import { useParams } from "react-router";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { typeColor } from "@/consts/type-color";
import type { Card } from "@/types/card";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { CardController } from "@/controllers/CardController";
import type { Move } from "@/types/move";
import type { Ability } from "@/types/ability";

type Params = {
  id: string;
};

export function PokemonViewer() {
  const params = useParams<Params>();
  const [pokemonData, setPokemonData] = useState<Card>();
  const [moveData, setMoveData] = useState<Move | null>(null);
  const [viewMoveIndex, setViewMoveIndex] = useState<number>(0);
  const [viewAbilityIndex, setViewAbilityIndex] = useState<number>(0);
  const [abilityData, setAbilityData] = useState<Ability | null>(null);

  const fetchData = async (id: string) => {
    if (!id) return;
    try {
      const pokemon = await CardController.getCardById(id);
      setViewMoveIndex(0);
      setViewAbilityIndex(0);
      setPokemonData(pokemon);
    } catch (err) {
      console.error("Erro ao obter carta pelo CardController:", err);
      setPokemonData(undefined);
    }
  };

  const getTypeColor = (typeName?: string) => {
    const key = typeName as unknown as keyof typeof typeColor | undefined;
    return (key && typeColor[key]) ?? "#777";
  };

  const fetchMoves = async (moveName?: string) => {
    const response = await CardController.getMoveByMoveId(moveName || "");
    return response
  };

   const fetchAbility = async (abilityName?: string) => {
    const response = await CardController.getAbilityByAbilityId(abilityName || "");
    return response;
  };

  useEffect(() => {
    fetchData(params.id || "");
  }, [params.id]);

  const handleBackMove = () => {
    if (viewMoveIndex == 0) {
      setViewMoveIndex(2);
      return;
    }

    setViewMoveIndex((prev) => prev - 1);
  };

  const handleAdvanceMove = () => {
    if (viewMoveIndex === 2) {
      setViewMoveIndex(0);
      return;
    }

    setViewMoveIndex((prev) => prev + 1);
  };

  const handleBackAbility = () => {
    if (viewAbilityIndex == 0) {
      setViewAbilityIndex(pokemonData?.abilities?.length! - 1);
      return;
    }

    setViewAbilityIndex((prev) => prev - 1);
  };

  const handleAdvanceAbility = () => {
    if (viewAbilityIndex === pokemonData?.abilities?.length! - 1) {
      setViewAbilityIndex(0);
      return;
    }

    setViewAbilityIndex((prev) => prev + 1);
  };


  useEffect(() => {
    if (!pokemonData) return;
    const abilityName = pokemonData.abilities?.[viewAbilityIndex];
    
    if (!abilityName) {
      setAbilityData(null);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await fetchAbility(abilityName);
        if (!cancelled) setAbilityData(data);
      } catch (err) {
        console.error("Erro ao buscar habilidade:", err);
        if (!cancelled) setAbilityData(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pokemonData, viewAbilityIndex]);

  useEffect(() => {
    if (!pokemonData) return;
    const moveName = pokemonData.moves?.[viewMoveIndex];
    
    if (!moveName) {
      setMoveData(null);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const data = await fetchMoves(moveName);
        if (!cancelled) setMoveData(data);
      } catch (err) {
        console.error("Erro ao buscar move:", err);
        if (!cancelled) setMoveData(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pokemonData, viewMoveIndex]);

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
    
              </div>
              <div
                className={styles.statBadge}
                style={{ border: "2px solid #ff5959", color: '#ff8989'}}  
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
              <span className={styles.cardInfoAttacksName}>Attacks</span>
              <div className={styles.cardAttack}>
                <button className={styles.buttonArrow} onClick={handleBackMove}>
                  <ChevronsLeft />
                </button>
                <div className={styles.attackBox}>
                  <div className={styles.attackHeader}>
                    <span className={styles.attackName}>
                      {(pokemonData.moves?.[viewMoveIndex] || '')
                        .charAt(0)
                        .toLocaleUpperCase() +
                        (pokemonData.moves?.[viewMoveIndex].slice(1) || '')}
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

                <button className={styles.buttonArrow} onClick={handleAdvanceMove}>
                  <ChevronsRight />
                </button>
              </div>

              <span className={styles.cardInfoAbilityName}>Abilities</span>
              <div className={styles.cardAttack}>
                <button className={styles.buttonArrow} onClick={handleBackAbility}>
                  <ChevronsLeft />
                </button>
                <div className={styles.attackBox}>
                  <div className={styles.attackHeader}>
                    <span className={styles.attackName}>
                      {(pokemonData.abilities?.[viewAbilityIndex] || '')
                        .charAt(0)
                        .toLocaleUpperCase() +
                        (pokemonData.abilities?.[viewAbilityIndex].slice(1) || '')}
                    </span>
                  </div>
                  <p className={styles.attackDescription}>
                    {abilityData?.description}
                  </p>
                </div>

                <button className={styles.buttonArrow} onClick={handleAdvanceAbility}>
                  <ChevronsRight />
                </button>
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
