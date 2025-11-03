import type { GetSpecificPokemonResponse, Card } from "@/types/card";

export class CardMapper {
  static fromApiResponse(res: GetSpecificPokemonResponse, id: string): Card {
    const types = res.types.map((t) => t.type.name);
    const typeColors = types.map((type) => CardMapper.getTypeColor(type));

    const stats: Record<string, number> = {};
    for (const s of res.stats) {
      stats[s.stat.name] = s.base_stat;
    }

    return {
      id: Number(id),
      name: res.name,
      types,
      typeColors,
      image: res.sprites.other["official-artwork"].front_default,
      hp: stats["hp"],
      attack: stats["attack"],
      defense: stats["defense"],
      isShiny: false,
      specialAttack: stats["special-attack"],
      specialDefense: stats["special-defense"],
      speed: stats["speed"],
      moves: res.moves.slice(0, 4).map((m) => m.move.name),
      damage: stats["attack"],
    };
  }

  private static getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
      normal: "#A8A77A",
      fire: "#EE8130",
      water: "#6390F0",
      electric: "#F7D02C",
      grass: "#7AC74C",
      ice: "#96D9D6",
      fighting: "#C22E28",
      poison: "#A33EA1",
      ground: "#E2BF65",
      flying: "#A98FF3",
      psychic: "#F95587",
      bug: "#A6B91A",
      rock: "#B6A136",
      ghost: "#735797",
      dragon: "#6F35FC",
      dark: "#705746",
      steel: "#B7B7CE",
      fairy: "#D685AD",
    };
    return typeColors[type] ?? "#777";
  }
}
