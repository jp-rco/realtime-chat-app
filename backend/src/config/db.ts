import { Pool } from "pg";

let pool: Pool;

export async function connectDB() {
  pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  await pool.connect();
  console.log("PostgreSQL connected");
}

export function db() {
  return pool;
}
