import { AuthService } from "@/services/AuthService";

interface User {
  id: string;
  username: string;
  email: string;
}

interface LoginResult {
  user: User;
  token: string;
}

export class AuthController {
  private static authService = AuthService.getInstance();

  static async login(username: string, password: string): Promise<LoginResult> {
    try {
      if (!username || username.trim() === "") {
        throw new Error("Nome de usuário é obrigatório");
      }

      if (!password || password.trim() === "") {
        throw new Error("Senha é obrigatória");
      }

      const response = await this.authService.login(username, password);

      if (!response.token || !response.user) {
        throw new Error("Resposta de login inválida");
      }

      localStorage.setItem("token", response.token);
      this.storeUser(response.user);

      return {
        user: response.user,
        token: response.token,
      };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw new Error(
        error instanceof Error ? error.message : "Erro ao realizar login"
      );
    }
  }

  static async logout(): Promise<void> {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  static async validateToken(token: string): Promise<boolean> {
    try {
      if (!token || token.trim() === "") {
        return false;
      }

      return await this.authService.validateToken(token);
    } catch (error) {
      console.error("Erro ao validar token:", error);
      return false;
    }
  }

  static getStoredToken(): string | null {
    try {
      return localStorage.getItem("token");
    } catch (error) {
      console.error("Erro ao recuperar token:", error);
      return null;
    }
  }

  static getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Erro ao recuperar usuário:", error);
      return null;
    }
  }

  static storeUser(user: User): void {
    try {
      if (!user || !user.id) {
        throw new Error("Dados do usuário inválidos");
      }
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Erro ao armazenar usuário:", error);
    }
  }
}
