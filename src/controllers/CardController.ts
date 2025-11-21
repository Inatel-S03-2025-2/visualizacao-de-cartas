import type { Card } from "@/types/card";
import { CardMapper } from "@/mappers/CardMapper";
import { PokeApiService } from "@/services/PokeApiService";
import { CardDistributionService } from "@/services/CardDistributionService";
import type { Move } from "@/types/move";
import { MoveMapper } from "@/mappers/MoveMapper";
import type { Ability } from "@/types/ability";
import { AbillityMapper } from "@/mappers/AbilityMapper";

export class CardController {
  private static pokeApiService = PokeApiService.getInstance();
  private static cardDistributionService =
    CardDistributionService.getInstance();

  static async fetchCardsByUserId(userId: string): Promise<Card[]> {
    const userCardsIds = await this.cardDistributionService.getUserCards(
      userId
    );
    const pokemonsData = await this.pokeApiService.fetchCards(userCardsIds);
    return pokemonsData.map((res, idx) =>
      CardMapper.fromApiResponse(res, String(userCardsIds[idx]))
    );
  }

  static async getCardById(id: string): Promise<Card> {
    const res = await this.pokeApiService.getCard(id);
    return CardMapper.fromApiResponse(res, id);
  }

  static async getMoveByMoveId(id: string): Promise<Move> {
    const res = await this.pokeApiService.fetchMove(id);
    return MoveMapper.fromApiResponse(res);
  }

  static async getAbilityByAbilityId(id: string): Promise<Ability> {
    const res = await this.pokeApiService.fetchAbility(id);
    return AbillityMapper.fromApiResponse(res);
  }
}
