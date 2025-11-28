import type { typeColor } from "@/consts/type-color";

export type TypeColor = (typeof typeColor)[keyof typeof typeColor];

export interface Card {
  id: number;
  name: string;
  types: string[];
  typeColors: string[];
  image: string;
  hp: number;
  attack: number;
  defense: number;
  specialAttack?: number;
  specialDefense?: number;
  speed?: number;
  isShiny: boolean;
  moves?: string[];
  damage?: number;
  abilities?: string[];
  cries: string;
}
