import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard username={user} onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
