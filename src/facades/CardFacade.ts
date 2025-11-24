import type { Card } from "@/types/card";
import type { Move } from "@/types/move";
import type { Ability } from "@/types/ability";
import { PokeApiService } from "@/services/PokeApiService";
import { CardDistributionService } from "@/services/CardDistributionService";
import { CardFactory } from "@/factories/CardFactory";
import { MoveFactory } from "@/factories/MoveFactory";
import { AbillityFactory } from "@/factories/AbilityFactory";

export class CardFacade {
  private static instance: CardFacade;
  private pokeApiService: PokeApiService;
  private cardDistributionService: CardDistributionService;

  private constructor() {
    this.pokeApiService = PokeApiService.getInstance();
    this.cardDistributionService = CardDistributionService.getInstance();
  }

  static getInstance(): CardFacade {
    if (!CardFacade.instance) {
      CardFacade.instance = new CardFacade();
    }
    return CardFacade.instance;
  }

  async getCardById(id: string): Promise<Card> {
    try {
      if (!id || id.trim() === "") {
        throw new Error("ID da carta inválido");
      }

      const response = await this.pokeApiService.getCard(id);
      return CardFactory.fromApiResponse(response, id);
    } catch (error) {
      console.error(`Erro ao buscar carta ${id}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Erro ao carregar carta ${id}`
      );
    }
  }

  async getUserCards(userId: string): Promise<Card[]> {
    try {
      if (!userId || userId.trim() === "") {
        throw new Error("ID do usuário inválido");
      }

      const cardIds = await this.cardDistributionService.getUserCards(userId);

      if (!cardIds || cardIds.length === 0) {
        return [];
      }

      const pokemonResponses = await this.pokeApiService.fetchCards(cardIds);

      return pokemonResponses.map((response, index) =>
        CardFactory.fromApiResponse(response, String(cardIds[index]))
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

  async getMoveDetails(moveName: string): Promise<Move> {
    try {
      if (!moveName || moveName.trim() === "") {
        throw new Error("Nome do movimento inválido");
      }

      const response = await this.pokeApiService.fetchMove(moveName);
      return MoveFactory.fromApiResponse(response);
    } catch (error) {
      console.error(`Erro ao buscar movimento ${moveName}:`, error);
      throw new Error(
        error instanceof Error
          ? error.message
          : `Erro ao carregar movimento ${moveName}`
      );
    }
  }

  async getAbilityDetails(abilityName: string): Promise<Ability> {
    try {
      if (!abilityName || abilityName.trim() === "") {
        throw new Error("Nome da habilidade inválido");
      }

      const response = await this.pokeApiService.fetchAbility(abilityName);
      return AbillityFactory.fromApiResponse(response);
    } catch (error) {
      console.error(`Erro ao buscar habilidade ${abilityName}:`, error);
      throw new Error(
        error instanceof Error
          ? error.message
          : `Erro ao carregar habilidade ${abilityName}`
      );
    }
  }

  async getCompleteCardData(id: string): Promise<{
    card: Card;
    moves: Move[];
    abilities: Ability[];
  }> {
    try {
      const card = await this.getCardById(id);

      const movesPromises =
        card.moves?.map((moveName) => this.getMoveDetails(moveName)) || [];

      const abilitiesPromises =
        card.abilities?.map((abilityName) =>
          this.getAbilityDetails(abilityName)
        ) || [];

      const [moves, abilities] = await Promise.all([
        Promise.all(movesPromises),
        Promise.all(abilitiesPromises),
      ]);

      return {
        card,
        moves,
        abilities,
      };
    } catch (error) {
      console.error(`Erro ao buscar dados completos da carta ${id}:`, error);
      throw new Error(
        error instanceof Error
          ? error.message
          : `Erro ao carregar dados completos da carta ${id}`
      );
    }
  }

  async getMultipleCards(ids: string[]): Promise<Card[]> {
    try {
      if (!ids || ids.length === 0) {
        return [];
      }

      const promises = ids.map((id) => this.getCardById(id));
      return await Promise.all(promises);
    } catch (error) {
      console.error("Erro ao buscar múltiplas cartas:", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erro ao carregar múltiplas cartas"
      );
    }
  }
}
