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
    const response = await this.authService.login(username, password);

    localStorage.setItem("token", response.token);

    return {
      user: response.user,
      token: response.token,
    };
  }

  static async logout(): Promise<void> {
    await this.authService.logout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  static async validateToken(token: string): Promise<boolean> {
    return this.authService.validateToken(token);
  }

  static getStoredToken(): string | null {
    return localStorage.getItem("token");
  }

  static getStoredUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  }

  static storeUser(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  }
}
