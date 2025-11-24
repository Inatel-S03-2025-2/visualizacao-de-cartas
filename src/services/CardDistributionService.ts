import { AuthController } from "@/controllers/AuthController";

// TODO: Usado quando implementação real for descomentada
interface UserCardsResponse {
  userId: string;
  cards: number[];
}

export class CardDistributionService {
  private static instance: CardDistributionService;
  private readonly BASE_URL = "http://localhost:4000/api";

  private constructor() {}

  static getInstance(): CardDistributionService {
    if (!CardDistributionService.instance) {
      CardDistributionService.instance = new CardDistributionService();
    }
    return CardDistributionService.instance;
  }

  private getAuthHeaders(): HeadersInit {
    const token = AuthController.getStoredToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async getUserCards(userId: string): Promise<number[]> {
    try {
      if (!userId || userId.trim() === "") {
        throw new Error("ID do usuário é obrigatório");
      }

      // Mock temporário - Remover quando backend estiver pronto
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            resolve([1, 7, 3, 4, 5]);
          } catch (error) {
            reject(error);
          }
        }, 300);
      });

      // TODO: Descomentar quando backend estiver pronto
      /*
      const response = await fetch(`${this.BASE_URL}/cards/user/${userId}`, {
        method: 'GET',
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Usuário não encontrado');
        }
        if (response.status === 401) {
          throw new Error('Não autorizado. Faça login novamente');
        }
        throw new Error(`Falha ao buscar cartas: ${response.statusText}`);
      }

      const data: UserCardsResponse = await response.json();
      
      if (!data || !Array.isArray(data.cards)) {
        throw new Error('Resposta inválida do servidor');
      }

      return data.cards;
      */
    } catch (error) {
      console.error(`Erro ao buscar cartas do usuário ${userId}:`, error);
      throw error;
    }
  }
}
