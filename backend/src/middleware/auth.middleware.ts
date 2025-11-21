import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

interface JwtUserPayload {
  id: number;
  username: string;
  iat?: number;
  exp?: number;
}

export default function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "No token provided" });
  }

  const parts = header.split(" ");
  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token malformed" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token malformed" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtUserPayload;
    (req as any).user = { id: decoded.id, username: decoded.username };
    return next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
