import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../config/db";

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await db().query(
    "INSERT INTO users(username, password_hash) VALUES ($1,$2)",
    [username, hash]
  );
  res.json({ message: "User created" });
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const result = await db().query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  if (!result.rows.length) return res.status(404).json({ error: "User not found" });

  const user = result.rows[0];
  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: "Wrong password" });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!);

  res.json({ token });
}
