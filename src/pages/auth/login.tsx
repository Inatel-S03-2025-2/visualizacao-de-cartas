import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Login } from "@/components";
import { useAuth } from "@/hooks/useAuth";

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (username: string) => {
    login(username);
    navigate("/dashboard");
  };

  return <Login onLogin={handleLogin} />;
}
