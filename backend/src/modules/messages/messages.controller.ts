import { Request, Response } from "express";
import { db } from "../../config/db";

export async function getHistory(req: Request, res: Response) {
  const { roomId } = req.params;
  const page = Number(req.query.page || 1);
  const pageSize = Number(req.query.pageSize || 20);
  const offset = (page - 1) * pageSize;

  const rows = await db().query(
    "SELECT * FROM messages WHERE room_id=$1 ORDER BY created_at DESC LIMIT $2 OFFSET $3",
    [roomId, pageSize, offset]
  );

  res.json(rows.rows);
}
