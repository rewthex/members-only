import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default pool;