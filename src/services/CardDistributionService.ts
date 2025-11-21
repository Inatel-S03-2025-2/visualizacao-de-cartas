import { AuthController } from "@/controllers/AuthController";

interface UserCardsResponse {
  userId: string;
  cards: number[]; // IDs dos pokémons
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
    // Simulação de chamada ao backend, retorna cards mockados por enquanto
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([1, 2, 3, 4, 5]);
      }, 300);
    });

    /*
    const response = await fetch(`${this.BASE_URL}/cards/user/${userId}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar cartas do usuário');
    }

    const data: UserCardsResponse = await response.json();
    return data.cards;
    */
  }
}
