import type { Card } from "@/types/card";
import type { Move } from "@/types/move";
import type { Ability } from "@/types/ability";
import { CardFacade } from "@/facades/CardFacade";

export class CardController {
  private static facade = CardFacade.getInstance();

  static async fetchCardsByUserId(userId: string): Promise<Card[]> {
    return this.facade.getUserCards(userId);
  }

  static async getCardById(id: string): Promise<Card> {
    return this.facade.getCardById(id);
  }

  static async getMoveByMoveId(id: string): Promise<Move> {
    return this.facade.getMoveDetails(id);
  }

  static async getAbilityByAbilityId(id: string): Promise<Ability> {
    return this.facade.getAbilityDetails(id);
  }

  static async getCompleteCardData(id: string): Promise<{
    card: Card;
    moves: Move[];
    abilities: Ability[];
  }> {
    return this.facade.getCompleteCardData(id);
  }
}
