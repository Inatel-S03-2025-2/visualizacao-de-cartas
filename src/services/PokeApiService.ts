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
    try {
      if (!idOrName) {
        throw new Error("ID ou nome do Pokémon é obrigatório");
      }

      const cacheKey = `pokemon-${idOrName}`;

      if (this.cache.has(cacheKey)) {
        return this.cache.get<GetSpecificPokemonResponse>(cacheKey)!;
      }

      const response = await fetch(`${this.BASE_URL}/pokemon/${idOrName}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Pokémon ${idOrName} não encontrado`);
        }
        throw new Error(`Erro ao buscar Pokémon: ${response.statusText}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Erro ao buscar Pokémon ${idOrName}:`, error);
      throw error;
    }
  }

  async fetchCards(ids: number[]): Promise<GetSpecificPokemonResponse[]> {
    try {
      if (!ids || ids.length === 0) {
        return [];
      }

      const promises = ids.map((id) => this.getCard(id));
      return await Promise.all(promises);
    } catch (error) {
      console.error("Erro ao buscar cartas:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erro ao buscar múltiplas cartas"
      );
    }
  }

  async fetchMove(moveName: string): Promise<GetMoveResponse> {
    try {
      if (!moveName || moveName.trim() === "") {
        throw new Error("Nome do movimento é obrigatório");
      }

      const cacheKey = `move-${moveName}`;

      if (this.cache.has(cacheKey)) {
        return this.cache.get<GetMoveResponse>(cacheKey)!;
      }

      const response = await fetch(`${this.BASE_URL}/move/${moveName}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Movimento ${moveName} não encontrado`);
        }
        throw new Error(`Erro ao buscar movimento: ${response.statusText}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Erro ao buscar movimento ${moveName}:`, error);
      throw error;
    }
  }

  async fetchAbility(abilityName: string): Promise<GetAbillityResponse> {
    try {
      if (!abilityName || abilityName.trim() === "") {
        throw new Error("Nome da habilidade é obrigatório");
      }

      const cacheKey = `ability-${abilityName}`;

      if (this.cache.has(cacheKey)) {
        return this.cache.get<GetAbillityResponse>(cacheKey)!;
      }

      const response = await fetch(`${this.BASE_URL}/ability/${abilityName}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Habilidade ${abilityName} não encontrada`);
        }
        throw new Error(`Erro ao buscar habilidade: ${response.statusText}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, data);
      return data;
    } catch (error) {
      console.error(`Erro ao buscar habilidade ${abilityName}:`, error);
      throw error;
    }
  }
}
