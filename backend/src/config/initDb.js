import fs from "fs";
import path from "path";
import pool from "./db.js";

export async function initDb() {
  const schemaPath = path.resolve("src/config/schema.sql");
  const schema = fs.readFileSync(schemaPath, "utf-8");
  await pool.query(schema);
}
