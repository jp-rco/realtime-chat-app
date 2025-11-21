import React from "react";
import { useAuth } from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";

const App: React.FC = () => {
  const { token, username, isAuthenticated, login, register, logout } = useAuth();

  if (!isAuthenticated || !token) {
    return <LoginPage onLogin={login} onRegister={register} />;
  }

  return <ChatPage token={token} username={username} onLogout={logout} />;
};

export default App;
