import type { GetAbillityResponse } from "./responses/get-ability-response";
import type { GetMoveResponse } from "./responses/get-move-response";
import type { GetSpecificPokemonResponse } from "./responses/get-specific-pokemon-response";

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

  static async fetchMove(
    moveName: string
  ): Promise<GetMoveResponse> {
    const response = await fetch(`${this.BASE_URL}/move/${moveName}`);
    if (!response.ok) {
      throw new Error(`Move ${moveName} não encontrado`);
    }   
    return response.json();
  }

  static async fetchAbility(
    abilityName: string
  ): Promise<GetAbillityResponse> {
    const response = await fetch(`${this.BASE_URL}/ability/${abilityName}`);
    if (!response.ok) {
      throw new Error(`Ability ${abilityName} não encontrada`);
    }   
    return response.json();
  }
}
