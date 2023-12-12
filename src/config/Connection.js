import { Pool } from "pg";

require("dotenv").config();

class Connection {
  pool;

  constructor() {
    this.pool = new Pool({
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      port: process.env.PG_PORT,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
    });
  }

  async query(text, params) {
    return this.pool.query(text, params);
  }

  async disconnect() {
    await this.pool.end();
  }
}

const connection = new Connection();

export default connection;
