import React from "react";
import { ChatMessage, SystemMessage } from "../../types";

interface Props {
  msg: ChatMessage | SystemMessage;
  username: string | null;
}

const MessageBubble: React.FC<Props> = ({ msg, username }) => {
  if ("type" in msg) {
    return (
      <div className="my-2 text-center text-[11px] text-slate-400">
        {msg.type === "userJoined" && (
          <span>🔔 {msg.user.username} se unió a la sala</span>
        )}
        {msg.type === "userLeft" && <span>👋 {msg.user.username} salió de la sala</span>}
      </div>
    );
  }

  const isOwn = msg.username === username;

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-1`}>
      <div
        className={`max-w-[70%] rounded-2xl px-3 py-2 text-xs shadow ${
          isOwn
            ? "bg-primary-600 text-white rounded-br-sm"
            : "bg-slate-800 text-slate-50 rounded-bl-sm"
        }`}
      >
        <div className="mb-0.5 text-[10px] font-semibold text-slate-200/80">
          {msg.username || (isOwn ? "Tú" : `Usuario ${msg.userId}`)}
        </div>
        <div className="text-[12px] leading-snug">{msg.content}</div>
        <div className="mt-1 text-[9px] text-slate-300/70">
          {msg.created_at
            ? new Date(msg.created_at).toLocaleTimeString()
            : new Date(msg.ts).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
