import { Router } from "express";
import auth from "../../middleware/auth.middleware";
import { createRoom, listRooms, joinRoom, leaveRoom } from "./rooms.controller";

const router = Router();

router.post("/", auth, createRoom);
router.get("/", auth, listRooms);
router.post("/:id/join", auth, joinRoom);
router.post("/:id/leave", auth, leaveRoom);

export default router;
