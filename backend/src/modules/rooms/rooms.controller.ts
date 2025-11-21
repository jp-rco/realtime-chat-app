import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../../config/db";

export async function createRoom(req: Request, res: Response) {
  const { name, is_private, password } = req.body;
  const user = (req as any).user;

  let hash: string | null = null;             // <-- aquí el cambio
  if (is_private && password) {
    hash = await bcrypt.hash(password, 10);
  }

  await db().query(
    "INSERT INTO rooms(name,is_private,password_hash,created_by) VALUES ($1,$2,$3,$4)",
    [name, is_private, hash, user.id]
  );

  res.json({ message: "Room created" });
}


export async function listRooms(req: Request, res: Response) {
  const result = await db().query("SELECT id,name,is_private FROM rooms");
  res.json(result.rows);
}

export async function joinRoom(req: Request, res: Response) {
  const user = (req as any).user;
  const roomId = req.params.id;
  const { password } = req.body;

  const room = await db().query(
    "SELECT * FROM rooms WHERE id=$1",
    [roomId]
  );
  if (!room.rows.length) return res.status(404).json({ error: "Room not found" });

  const r = room.rows[0];
  if (r.is_private) {
    const ok = await bcrypt.compare(password, r.password_hash);
    if (!ok) return res.status(401).json({ error: "Wrong room password" });
  }

  await db().query(
    "INSERT INTO room_members(user_id,room_id) VALUES ($1,$2) ON CONFLICT DO NOTHING",
    [user.id, roomId]
  );

  res.json({ message: "Joined" });
}

export async function leaveRoom(req: Request, res: Response) {
  const user = (req as any).user;
  const roomId = req.params.id;

  await db().query(
    "DELETE FROM room_members WHERE user_id=$1 AND room_id=$2",
    [user.id, roomId]
  );

  res.json({ message: "Left room" });
}
