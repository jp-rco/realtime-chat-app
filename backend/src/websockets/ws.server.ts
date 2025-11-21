import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { getChannel } from "../config/rabbitmq";

export function initWebSocketServer(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!);
      (socket as any).user = payload;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    const user = (socket as any).user;

    socket.on("joinRoom", ({ roomId }) => {
      socket.join(`room:${roomId}`);
      // Notificación de entrada
      io.to(`room:${roomId}`).emit("systemMessage", {
        type: "userJoined",
        user,
        roomId,
      });
    });

    socket.on("leaveRoom", ({ roomId }) => {
      socket.leave(`room:${roomId}`);
      io.to(`room:${roomId}`).emit("systemMessage", {
        type: "userLeft",
        user,
        roomId,
      });
    });

    socket.on("sendMessage", async ({ roomId, content }) => {
      const channel = getChannel();
      const payload = JSON.stringify({ roomId, userId: user.id, content, ts: Date.now() });

      // Publicas en el broker
      channel.publish("chat.exchange", `room.${roomId}.message`, Buffer.from(payload));
    });
  });

  // Consumidor RabbitMQ para retransmitir al WS
  (async () => {
    const channel = getChannel();
    const q = await channel.assertQueue("", { exclusive: true });
    await channel.bindQueue(q.queue, "chat.exchange", "room.*.message");

    channel.consume(q.queue, (msg) => {
      if (!msg) return;
      const data = JSON.parse(msg.content.toString());
      io.to(`room:${data.roomId}`).emit("message", data);
      channel.ack(msg);
    });
  })();
}
