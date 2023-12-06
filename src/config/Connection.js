import { Client } from "pg";

require("dotenv").config();

class Connection {
  async conn() {
    const client = await new Client({
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      port: process.env.PG_PORT,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
    });

    await client.connect();
    // const consulta = await client.query(command);

    // return consulta;

    return client;
  }
}

export default new Connection();
