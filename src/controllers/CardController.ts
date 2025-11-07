import type { Card } from "@/types/card";
import { CardMapper } from "@/mappers/CardMapper";
import { PokeApiService } from "@/services/PokeApiService";

const USER_CARDS_MOCK = [1, 2, 3, 4, 5];

export class CardController {  
  
  static async fetchCardsByUserId(userId: string): Promise<Card[]> {
    const userCardsIds = USER_CARDS_MOCK; // futuramente da API de distribuição de cartas
    const pokemonsData = await PokeApiService.getPokemons(userCardsIds);
    return pokemonsData.map((res, idx) =>
      CardMapper.fromApiResponse(res, String(userCardsIds[idx]))
    );
  }

  static async getCardById(id: string): Promise<Card> {
    const res = await PokeApiService.getPokemon(id);
    return CardMapper.fromApiResponse(res, id);
  }
}
