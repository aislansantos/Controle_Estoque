import connection from "../../config/Connection";

class SellerModels {
  async index() {
    const query = "SELECT * FROM seller ORDER BY id";
    const conn = await connection.conn();
    const sellers = await conn.query(query);
    return sellers.rows;
  }

  async show(id) {
    const query = "SELECT * FROM seller WHERE id = $1";
    const conn = await connection.conn();
    const seller = await conn.query(query, [id]);
    return seller.rows;
  }

  async create(seller) {
    const query = "INSERT INTO seller (name, branch) VALUES ($1, $2)";
    const { name, branch } = seller;
    const conn = await connection.conn();
    const sellerCreated = await conn.query(query, [name, branch]);
    return sellerCreated;
  }

  async update(id, seller) {
    const query = "UPDATE seller SET name = $1, branch = $2";
    const { name, branch } = seller;
    const conn = await connection.conn();
    const sellerUpdated = await conn.query(query, [name, branch]);
    return sellerUpdated;
  }

  async destroy(id) {
    const qyery = "DELETE FROM seller WHERE id = $1";
    const conn = await connection.conn();
    const sellerDestroyed = await conn.query(qyery, [id]);
    return sellerDestroyed;
  }
}
export default new SellerModels();
