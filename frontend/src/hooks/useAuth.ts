import { useState } from "react";
import api from "../services/api";

interface AuthState {
  token: string | null;
  username: string | null;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    return { token, username };
  });

  async function login(username: string, password: string) {
    const res = await api.post("/auth/login", { username, password });
    const token = res.data.token;
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setAuth({ token, username });
  }

  async function register(username: string, password: string) {
    await api.post("/auth/register", { username, password });
    await login(username, password);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setAuth({ token: null, username: null });
  }

  return {
    token: auth.token,
    username: auth.username,
    isAuthenticated: !!auth.token,
    login,
    register,
    logout
  };
}
