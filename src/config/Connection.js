import conn from "pg";

require("dotenv").config();

class Connection {
  async conn(command) {
    console.log(process.env.PG_PASSWORD);
    const client = new conn.Client({
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      port: process.env.PG_PORT,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
    });

    await client.connect();
    const consulta = await client.query(command);

    return consulta.rows;
  }
}

export default new Connection();
