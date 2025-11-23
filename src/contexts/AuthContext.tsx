import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { AuthController } from "@/controllers/AuthController";

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return AuthController.getStoredUser();
    } catch (error) {
      console.error("Erro ao recuperar usuário armazenado:", error);
      return null;
    }
  });

  const login = async (username: string, password: string) => {
    try {
      const { user: userData } = await AuthController.login(username, password);
      setUser(userData);
      AuthController.storeUser(userData);
    } catch (error) {
      console.error("Erro no login:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AuthController.logout();
    } catch (error) {
      console.error("Erro no logout:", error);
    } finally {
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
