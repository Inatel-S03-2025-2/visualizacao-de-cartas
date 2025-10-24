export interface Pokemon {
  id: number;
  name: string;
  types: string[];
  typeColor: string;
  image: string;
  hp: number;
  attack: number;
  defense: number;
  specialAttack?: number;
  specialDefense?: number;
  speed?: number;
  generation: number;
  isShiny: boolean;
  moves?: string[];
  rarity?: string;
  damage?: number;
}
