import { useState } from "react";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState<string | null>(null);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <>{!user ? <Login onLogin={handleLogin} /> : <div>Hello World</div>}</>
  );
}

export default App;
