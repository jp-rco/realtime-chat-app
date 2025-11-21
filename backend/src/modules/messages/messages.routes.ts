import { Router } from "express";
import auth from "../../middleware/auth.middleware";
import { getHistory } from "./messages.controller";

const router = Router();

router.get("/:roomId", auth, getHistory);

export default router;
