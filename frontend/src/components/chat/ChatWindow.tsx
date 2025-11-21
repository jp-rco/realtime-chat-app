import React, { useEffect, useRef } from "react";
import { Room, ChatMessage, SystemMessage } from "../../types";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { Button } from "../common/Button";

interface Props {
  room: Room | null;
  messages: (ChatMessage | SystemMessage)[];
  username: string | null;
  loadingMessages: boolean;
  onSendMessage: (content: string) => void;
  onLeaveRoom: () => Promise<void>;
}

const ChatWindow: React.FC<Props> = ({
  room,
  messages,
  username,
  loadingMessages,
  onSendMessage,
  onLeaveRoom
}) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, room]);

  if (!room) {
    return (
      <section className="flex flex-1 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-950/40 text-sm text-slate-400">
        <p className="mb-1 font-medium text-slate-300">
          Selecciona una sala o crea una nueva
        </p>
        <p className="text-xs text-slate-500">
          Podrás ver el historial de mensajes y enviar mensajes en tiempo real.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col rounded-2xl border border-slate-800 bg-slate-950/60 shadow-xl shadow-slate-950/60">
      <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-50">
            #{room.name}
          </h2>
          <p className="text-[11px] text-slate-400">
            Sala {room.is_private ? "privada" : "pública"}
          </p>
        </div>
        <Button variant="ghost" className="px-3 py-1 text-[11px]" onClick={onLeaveRoom}>
          Salir de la sala
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-3 text-xs">
        {loadingMessages && (
          <p className="mb-2 text-center text-[11px] text-slate-400">Cargando historial...</p>
        )}
        {messages.map((m, idx) => (
          <MessageBubble key={idx} msg={m} username={username} />
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-slate-800 p-3">
        <MessageInput onSend={onSendMessage} />
      </div>
    </section>
  );
};

export default ChatWindow;
