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
    try {
      if (!userId || userId.trim() === "") {
        throw new Error("ID do usuário inválido");
      }

      const userCardsIds = await this.cardDistributionService.getUserCards(
        userId
      );

      if (!userCardsIds || userCardsIds.length === 0) {
        return [];
      }

      const pokemonsData = await this.pokeApiService.fetchCards(userCardsIds);
      return pokemonsData.map((res, idx) =>
        CardMapper.fromApiResponse(res, String(userCardsIds[idx]))
      );
    } catch (error) {
      console.error("Erro ao buscar cartas do usuário:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erro ao carregar cartas do usuário"
      );
    }
  }

  static async getCardById(id: string): Promise<Card> {
    try {
      if (!id || id.trim() === "") {
        throw new Error("ID da carta inválido");
      }

      const res = await this.pokeApiService.getCard(id);
      return CardMapper.fromApiResponse(res, id);
    } catch (error) {
      console.error(`Erro ao buscar carta ${id}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Erro ao carregar carta ${id}`
      );
    }
  }

  static async getMoveByMoveId(id: string): Promise<Move> {
    try {
      if (!id || id.trim() === "") {
        throw new Error("ID do movimento inválido");
      }

      const res = await this.pokeApiService.fetchMove(id);
      return MoveMapper.fromApiResponse(res);
    } catch (error) {
      console.error(`Erro ao buscar movimento ${id}:`, error);
      throw new Error(
        error instanceof Error
          ? error.message
          : `Erro ao carregar movimento ${id}`
      );
    }
  }

  static async getAbilityByAbilityId(id: string): Promise<Ability> {
    try {
      if (!id || id.trim() === "") {
        throw new Error("ID da habilidade inválido");
      }

      const res = await this.pokeApiService.fetchAbility(id);
      return AbillityMapper.fromApiResponse(res);
    } catch (error) {
      console.error(`Erro ao buscar habilidade ${id}:`, error);
      throw new Error(
        error instanceof Error
          ? error.message
          : `Erro ao carregar habilidade ${id}`
      );
    }
  }
}
