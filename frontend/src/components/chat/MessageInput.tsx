import React, { useState } from "react";
import { Button } from "../common/Button";

interface Props {
  onSend: (content: string) => void;
}

const MessageInput: React.FC<Props> = ({ onSend }) => {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-2xl bg-slate-900/90 p-2"
    >
      <textarea
        className="flex-1 resize-none rounded-xl bg-slate-950/80 px-3 py-2 text-xs text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        rows={2}
        placeholder="Escribe un mensaje..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit" className="h-full py-2 text-xs">
        Enviar
      </Button>
    </form>
  );
};

export default MessageInput;
