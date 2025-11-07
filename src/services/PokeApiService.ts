import type { GetSpecificPokemonResponse } from "@/types/card";

export class PokeApiService {
  private static readonly BASE_URL = "https://pokeapi.co/api/v2";

  static async getCard(
    idOrName: string | number
  ): Promise<GetSpecificPokemonResponse> {
    const response = await fetch(`${this.BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Pokémon ${idOrName} não encontrado`);
    }
    return response.json();
  }

  static async fetchCards(
    ids: number[]
  ): Promise<GetSpecificPokemonResponse[]> {
    const promises = ids.map((id) => this.getCard(id));
    return Promise.all(promises);
  }
}
