import connection from "../../../config/Connection";

class SellerModels {
  async index() {
    try {
      const query = `
      SELECT *
      FROM seller
      ORDER BY id`;
      const sellers = await connection.query(query);

      return sellers.rows;
    } catch (error) {
      console.error("Error fetching sellers:", error);
      throw new Error("An error occurred while fetching sellers.");
    }
  }

  async show(id) {
    try {
      const query = `
      SELECT *
      FROM seller
      WHERE id = $1`;
      const seller = await connection.query(query, [id]);

      return seller.rows;
    } catch (error) {
      console.error("Error fetching seller:", error);
      throw new Error("An error occurred while fetching seller.");
    }
  }

  async create(seller) {
    try {
      const query = `
      INSERT
      INTO seller (name, email, branch) VALUES ($1, $2, $3)
      RETURNING id, name, email, branch`;
      const { name, email, branch } = seller;
      const sellerCreated = await connection.query(query, [
        name,
        email,
        branch,
      ]);

      return sellerCreated;
    } catch (error) {
      console.error("Error creating seller:", error);
      throw new Error("An error occurred while creating seller.");
    }
  }

  async update(id, seller) {
    try {
      const query = `
      UPDATE seller
      SET name = $1, email=$2, branch = $3
      WHERE id = $4`;
      const { name, email, branch } = seller;
      const sellerUpdated = await connection.query(query, [
        name,
        email,
        branch,
        id,
      ]);

      return sellerUpdated;
    } catch (error) {
      console.error("Error updating seller:", error);
      throw new Error("An error occurred while updating seller.");
    }
  }

  async destroy(id) {
    try {
      const qyery = `
      DELETE
      FROM seller
      WHERE id = $1`;
      const sellerDestroyed = await connection.query(qyery, [id]);

      return sellerDestroyed;
    } catch (error) {
      console.error("Error deleting seller:", error);
      throw new Error("An error occurred while deleting seller.");
    }
  }
}
export default new SellerModels();
