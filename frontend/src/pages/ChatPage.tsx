import React, { useEffect } from "react";
import MainLayout from "../components/Layout/MainLayout";
import RoomList from "../components/chat/RoomList";
import ChatWindow from "../components/chat/ChatWindow";
import { useChat } from "../hooks/useChat";
import { Room } from "../types";

interface Props {
  token: string;
  username: string | null;
  onLogout: () => void;
}

const ChatPage: React.FC<Props> = ({ token, username, onLogout }) => {
  const {
    rooms,
    currentRoom,
    messages,
    loadingRooms,
    loadingMessages,
    fetchRooms,
    joinRoom,
    leaveCurrentRoom,
    sendMessage,
    createRoom
  } = useChat(token);

  useEffect(() => {
    fetchRooms();
  }, []);

  async function handleJoin(room: Room, password?: string) {
    await joinRoom(room, password);
  }

  return (
    <MainLayout username={username} onLogout={onLogout}>
      <div className="flex w-full gap-4">
        <div className="w-64">
          {loadingRooms ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/40 text-xs text-slate-400">
              Cargando salas...
            </div>
          ) : (
            <RoomList
              rooms={rooms}
              currentRoom={currentRoom}
              onRefresh={fetchRooms}
              onCreateRoom={createRoom}
              onJoinRoom={handleJoin}
            />
          )}
        </div>

        <ChatWindow
          room={currentRoom}
          messages={messages}
          username={username}
          loadingMessages={loadingMessages}
          onSendMessage={sendMessage}
          onLeaveRoom={leaveCurrentRoom}
        />
      </div>
    </MainLayout>
  );
};

export default ChatPage;
