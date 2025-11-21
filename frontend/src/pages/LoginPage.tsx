import React, { useState } from "react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/input";

interface Props {
  onLogin: (username: string, password: string) => Promise<void>;
  onRegister: (username: string, password: string) => Promise<void>;
}

const LoginPage: React.FC<Props> = ({ onLogin, onRegister }) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await onLogin(username, password);
      } else {
        await onRegister(username, password);
      }
    } catch (err: any) {
      setError(err?.response?.data?.error || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4 py-6">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 items-center">
        {/* Lado izquierdo: texto hero */}
        <div className="hidden md:flex flex-col gap-4">
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-900/70 border border-slate-700 px-3 py-1 text-[11px] text-slate-300 w-fit">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[10px] font-bold">
              RT
            </span>
            Chat en tiempo real · Salas públicas y privadas
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-50">
            Real-Time Chat para tu
            <span className="text-primary-400"> parcial de sistemas distribuidos</span>.
          </h1>

          <p className="text-sm text-slate-400 leading-relaxed max-w-md">
            Autenticación sencilla, salas con control de acceso, mensajes en tiempo real y
            un diseño limpio listo para demo. Solo inicia sesión, entra a una sala y
            comienza a probar la experiencia.
          </p>

          <ul className="mt-2 space-y-1 text-xs text-slate-400">
            <li>• Arquitectura cliente–servidor con WebSockets y broker.</li>
            <li>• Salas públicas y privadas con historial persistente.</li>
            <li>• Interfaz preparada para mostrar en presentación.</li>
          </ul>
        </div>

        {/* Card de login */}
        <div className="w-full">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/90 shadow-2xl shadow-slate-950/70 px-6 py-7">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-600 text-sm font-bold">
                  RT
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-50">
                    Real-Time Chat
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Inicia sesión o crea tu usuario para continuar
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-4 flex w-full rounded-full bg-slate-900/80 p-1 text-xs">
              <button
                type="button"
                className={`flex-1 rounded-full px-3 py-1.5 transition ${
                  mode === "login"
                    ? "bg-primary-600 text-white shadow shadow-primary-500/40"
                    : "text-slate-400"
                }`}
                onClick={() => setMode("login")}
              >
                Iniciar sesión
              </button>
              <button
                type="button"
                className={`flex-1 rounded-full px-3 py-1.5 transition ${
                  mode === "register"
                    ? "bg-primary-600 text-white shadow shadow-primary-500/40"
                    : "text-slate-400"
                }`}
                onClick={() => setMode("register")}
              >
                Registrarse
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <Input
                label="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="ej. juanp"
              />
              <Input
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Ingresa una contraseña"
              />

              {error && (
                <p className="text-[11px] text-rose-400 bg-rose-950/40 border border-rose-500/40 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <Button className="mt-1 w-full py-2 text-xs" disabled={loading}>
                {loading
                  ? "Procesando..."
                  : mode === "login"
                  ? "Entrar"
                  : "Crear cuenta y entrar"}
              </Button>
            </form>

            <p className="mt-4 text-[11px] text-slate-500 text-center">
              Tip: abre otra ventana del navegador con otro usuario para mostrar el chat
              en tiempo real en la demo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
