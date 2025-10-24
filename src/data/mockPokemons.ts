import type { Pokemon } from "@/types/pokemon";

export const mockPokemons: Pokemon[] = [
  {
    id: 25,
    name: "Pikachu",
    types: ["Electric"],
    typeColor: "#F4D03F",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    hp: 35,
    attack: 55,
    defense: 40,
    generation: 1,
    isShiny: false,
  },
  {
    id: 6,
    name: "Charizard",
    types: ["Fire", "Flying"],
    typeColor: "#E74C3C",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    hp: 78,
    attack: 84,
    defense: 78,
    generation: 1,
    isShiny: true,
  },
  {
    id: 9,
    name: "Blastoise",
    types: ["Water"],
    typeColor: "#3498DB",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    hp: 79,
    attack: 83,
    defense: 100,
    generation: 1,
    isShiny: false,
  },
  {
    id: 3,
    name: "Venusaur",
    types: ["Grass", "Poison"],
    typeColor: "#2ECC71",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    hp: 80,
    attack: 82,
    defense: 83,
    generation: 1,
    isShiny: false,
  },
  {
    id: 94,
    name: "Gengar",
    types: ["Ghost", "Poison"],
    typeColor: "#9B59B6",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png",
    hp: 60,
    attack: 65,
    defense: 60,
    generation: 1,
    isShiny: false,
  },
];
