export interface User {
  id: number;
  username: string;
}

export interface Room {
  id: number;
  name: string;
  is_private: boolean;
}

export interface ChatMessage {
  roomId: number;
  userId: number;
  content: string;
  ts: number;
  created_at?: string;
  username?: string;
}

export interface SystemMessage {
  type: "userJoined" | "userLeft";
  user: { id: number; username: string };
}
