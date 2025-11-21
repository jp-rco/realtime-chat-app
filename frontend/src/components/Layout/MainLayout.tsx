import React from "react";

interface Props {
  username: string | null;
  onLogout: () => void;
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ username, onLogout, children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-xl bg-primary-600 flex items-center justify-center text-xs font-bold">
              RT
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Real-Time Chat</p>
              <p className="text-[11px] text-slate-400 leading-tight">
                Salas públicas y privadas con mensajería en tiempo real
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            {username && (
              <span className="rounded-full bg-slate-800 px-3 py-1 text-slate-200">
                Conectado como <span className="font-semibold">{username}</span>
              </span>
            )}
            <button
              onClick={onLogout}
              className="text-xs text-slate-400 hover:text-rose-300 underline-offset-2 hover:underline"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
};

export default MainLayout;
