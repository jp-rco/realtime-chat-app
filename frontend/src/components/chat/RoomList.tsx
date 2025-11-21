import React, { useState } from "react";
import { Room } from "../../types";
import { Button } from "../common/Button";
import { Input } from "../common/input";
import { Badge } from "../common/badge";

interface Props {
  rooms: Room[];
  currentRoom: Room | null;
  onRefresh: () => void;
  onCreateRoom: (name: string, isPrivate: boolean, password?: string) => Promise<void>;
  onJoinRoom: (room: Room, password?: string) => Promise<void>;
}

const RoomList: React.FC<Props> = ({
  rooms,
  currentRoom,
  onRefresh,
  onCreateRoom,
  onJoinRoom
}) => {
  const [showCreate, setShowCreate] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [roomPassword, setRoomPassword] = useState("");

  const [joinPassword, setJoinPassword] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    await onCreateRoom(roomName, isPrivate, isPrivate ? roomPassword : undefined);
    setRoomName("");
    setRoomPassword("");
    setIsPrivate(false);
    setShowCreate(false);
  }

  return (
    <aside className="flex w-64 flex-col rounded-2xl border border-slate-800 bg-slate-950/60 p-3 shadow-xl shadow-slate-950/60">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Salas</p>
          <p className="text-[11px] text-slate-400">Públicas y privadas</p>
        </div>
        <button
          className="text-xs text-slate-400 hover:text-slate-100"
          onClick={onRefresh}
        >
          Actualizar
        </button>
      </div>

      <div className="mb-2 flex justify-between gap-2">
        <Button
          className="w-full text-xs py-1.5"
          onClick={() => setShowCreate((p) => !p)}
        >
          Nueva sala
        </Button>
      </div>

      {showCreate && (
        <form
          onSubmit={handleCreate}
          className="mb-3 space-y-2 rounded-xl bg-slate-900/70 p-3 text-xs"
        >
          <Input
            label="Nombre"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300">Privada</span>
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          </div>
          {isPrivate && (
            <Input
              label="Contraseña"
              type="password"
              value={roomPassword}
              onChange={(e) => setRoomPassword(e.target.value)}
            />
          )}
          <Button className="w-full py-1.5 text-xs">Crear</Button>
        </form>
      )}

      <div className="mb-2 h-px bg-slate-800" />

      <div className="flex-1 space-y-1 overflow-y-auto pr-1 text-xs">
        {rooms.map((r) => (
          <button
            key={r.id}
            className={`w-full rounded-xl px-3 py-2 text-left transition ${
              currentRoom?.id === r.id
                ? "bg-slate-800 border border-primary-500/60"
                : "bg-slate-900/60 border border-slate-800 hover:border-slate-600 hover:bg-slate-900"
            }`}
            onClick={async () => {
              if (r.is_private) {
                const pwd = prompt("Contraseña de la sala privada:") || "";
                setJoinPassword(pwd);
                await onJoinRoom(r, pwd);
              } else {
                await onJoinRoom(r);
              }
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium">{r.name}</span>
              {r.is_private ? (
                <Badge color="yellow">Privada</Badge>
              ) : (
                <Badge color="green">Pública</Badge>
              )}
            </div>
          </button>
        ))}

        {!rooms.length && (
          <p className="mt-4 text-center text-[11px] text-slate-500">
            No hay salas creadas aún.
          </p>
        )}
      </div>
    </aside>
  );
};

export default RoomList;
