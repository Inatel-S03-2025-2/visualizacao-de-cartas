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
    return AuthController.getStoredUser();
  });

  const login = async (username: string, password: string) => {
    const { user: userData } = await AuthController.login(username, password);
    setUser(userData);
    AuthController.storeUser(userData);
  };

  const logout = async () => {
    await AuthController.logout();
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
