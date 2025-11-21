import type { GetAbillityResponse } from "./responses/get-ability-response";
import type { GetMoveResponse } from "./responses/get-move-response";
import type { GetSpecificPokemonResponse } from "./responses/get-specific-pokemon-response";
import { ApiCache } from "./ApiCache";

export class PokeApiService {
  private static instance: PokeApiService;
  private readonly BASE_URL = "https://pokeapi.co/api/v2";
  private cache: ApiCache;

  private constructor() {
    this.cache = ApiCache.getInstance();
  }

  static getInstance(): PokeApiService {
    if (!PokeApiService.instance) {
      PokeApiService.instance = new PokeApiService();
    }
    return PokeApiService.instance;
  }

  async getCard(
    idOrName: string | number
  ): Promise<GetSpecificPokemonResponse> {
    const cacheKey = `pokemon-${idOrName}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get<GetSpecificPokemonResponse>(cacheKey)!;
    }

    const response = await fetch(`${this.BASE_URL}/pokemon/${idOrName}`);
    if (!response.ok) {
      throw new Error(`Pokémon ${idOrName} não encontrado`);
    }

    const data = await response.json();
    this.cache.set(cacheKey, data);
    return data;
  }

  async fetchCards(ids: number[]): Promise<GetSpecificPokemonResponse[]> {
    const promises = ids.map((id) => this.getCard(id));
    return Promise.all(promises);
  }

  async fetchMove(moveName: string): Promise<GetMoveResponse> {
    const cacheKey = `move-${moveName}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get<GetMoveResponse>(cacheKey)!;
    }

    const response = await fetch(`${this.BASE_URL}/move/${moveName}`);
    if (!response.ok) {
      throw new Error(`Move ${moveName} não encontrado`);
    }

    const data = await response.json();
    this.cache.set(cacheKey, data);
    return data;
  }

  async fetchAbility(abilityName: string): Promise<GetAbillityResponse> {
    const cacheKey = `ability-${abilityName}`;

    if (this.cache.has(cacheKey)) {
      return this.cache.get<GetAbillityResponse>(cacheKey)!;
    }

    const response = await fetch(`${this.BASE_URL}/ability/${abilityName}`);
    if (!response.ok) {
      throw new Error(`Ability ${abilityName} não encontrada`);
    }

    const data = await response.json();
    this.cache.set(cacheKey, data);
    return data;
  }
}
