import http from "http";
import app from "./app";
import { initWebSocketServer } from "./websockets/ws.server";
import { connectDB } from "./config/db";
import { connectRabbitMQ } from "./config/rabbitmq";

async function start() {
  await connectDB();
  await connectRabbitMQ();

  const server = http.createServer(app);

  initWebSocketServer(server);

  server.listen(4000, () =>
    console.log("Backend running on http://localhost:4000")
  );
}

start();
