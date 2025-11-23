interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}

export class AuthService {
  private static instance: AuthService;
  private readonly BASE_URL = "http://localhost:3000/api";

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    // Mock temporário - Remover quando backend estiver pronto
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: "1",
            username: username,
            email: `${username}@example.com`,
          },
          token: "mock-jwt-token-" + Date.now(),
        });
      }, 500);
    });

    // TODO: Descomentar quando backend estiver pronto
    /*
    const response = await fetch(`${this.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Falha no login');
    }

    return response.json();
    */
  }

  async logout(): Promise<void> {
    // Mock temporário - Remover quando backend estiver pronto
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200);
    });

    // TODO: Descomentar quando backend estiver pronto
    /*
    const token = localStorage.getItem('token');
    await fetch(`${this.BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    */
  }

  async validateToken(token: string): Promise<boolean> {
    // Mock temporário - Remover quando backend estiver pronto
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(!!token);
      }, 100);
    });

    // TODO: Descomentar quando backend estiver pronto
    /*
    try {
      const response = await fetch(`${this.BASE_URL}/auth/validate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.ok;
    } catch {
      return false;
    }
    */
  }
}
