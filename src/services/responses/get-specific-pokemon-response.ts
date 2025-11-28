export interface GetSpecificPokemonResponse {
  moves: {
    move: {
      url: string;
      name: string;
    };
  }[];
  abilities: {
    ability: {
      url: string;
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
  name: string;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  cries: {
    latest: string;
  };
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
}
