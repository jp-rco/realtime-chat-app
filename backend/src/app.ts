import express from "express";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import roomsRoutes from "./modules/rooms/rooms.routes";
import messagesRoutes from "./modules/messages/messages.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/rooms", roomsRoutes);
app.use("/messages", messagesRoutes);

export default app;
