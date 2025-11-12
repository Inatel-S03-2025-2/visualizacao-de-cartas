export interface Move {
  name: string;
  accuracy: number | null;
  power: number | null;
  pp: number | null;
  type: { name: string };
  effect_entries: {
    effect: string;
    short_effect: string;
    language: { name: string };
  }[];
}

