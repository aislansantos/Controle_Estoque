import connection from "../../../config/Connection";

class SellerModels {
  async index() {
    const query = `
      SELECT *
      FROM seller
      ORDER BY id`;
    const sellers = await connection.query(query);

    return sellers.rows;
  }

  async show(id) {
    const query = `
      SELECT *
      FROM seller
      WHERE id = $1`;
    const seller = await connection.query(query, [id]);

    return seller.rows;
  }

  async create(seller) {
    const query = `
      INSERT
      INTO seller (name, email, branch) VALUES ($1, $2, $3)`;
    const { name, email, branch } = seller;
    const sellerCreated = await connection.query(query, [name, email, branch]);

    return sellerCreated;
  }

  async update(id, seller) {
    const query = `
      UPDATE seller
      SET name = $1, email=$2, branch = $3
      WHERE id = $3`;
    const { name, email, branch } = seller;
    const sellerUpdated = await connection.query(query, [
      name,
      email,
      branch,
      id,
    ]);

    return sellerUpdated;
  }

  async destroy(id) {
    const qyery = `
      DELETE
      FROM seller
      WHERE id = $1`;
    const sellerDestroyed = await connection.query(qyery, [id]);

    return sellerDestroyed;
  }
}
export default new SellerModels();
