import type { Card } from "@/types/card";
import { CardMapper } from "@/mappers/CardMapper";
import { PokeApiService } from "@/services/PokeApiService";
import type { Move } from "@/types/move";
import { MoveMapper } from "@/mappers/MoveMapper";
import type { Ability } from "@/types/ability";
import { AbillityMapper } from "@/mappers/AbilityMapper";

const USER_CARDS_MOCK = [1, 2, 3, 4, 5];

export class CardController {
  static async fetchCardsByUserId(userId: string): Promise<Card[]> {
    const userCardsIds = USER_CARDS_MOCK; // futuramente da API de distribuição de cartas
    const pokemonsData = await PokeApiService.fetchCards(userCardsIds);
    return pokemonsData.map((res, idx) =>
      CardMapper.fromApiResponse(res, String(userCardsIds[idx]))
    );
  }

  static async getCardById(id: string): Promise<Card> {
    const res = await PokeApiService.getCard(id);
    return CardMapper.fromApiResponse(res, id);
  }

  static async getMoveByMoveId(id: string): Promise<Move> {
    const res = await PokeApiService.fetchMove(id);
    return MoveMapper.fromApiResponse(res);
  }

  static async getAbilityByAbilityId(id: string): Promise<Ability> {
    const res = await PokeApiService.fetchAbility(id);
    return AbillityMapper.fromApiResponse(res);
  }
}
