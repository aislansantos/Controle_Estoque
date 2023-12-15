import connection from "../../../config/Connection";

class ProductUnitModels {
  async index() {
    try {
      const query = `
      SELECT *
      FROM product_unit`;
      const productUnits = await connection.query(query);

      return productUnits.rows;
    } catch (error) {
      console.error("Error fetching product units:", error);
      throw new Error("An error occurred while updating product units.");
    }
  }

  async show(id) {
    try {
      const query = `
      SELECT *
      FROM product_unit
      WHERE id = $1`;

      const productUnit = await connection.query(query, [id]);

      return productUnit.rows;
    } catch (error) {
      console.error("Error fetching product unit:", error);
      throw new Error("An error occurred while updating product unit.");
    }
  }

  async create(productUnit) {
    try {
      const query = `
      INSERT INTO product_unit (description)
      VALUES ($1)`;
      const { description } = productUnit;
      const productUnitCreated = await connection.query(query, [description]);

      return productUnitCreated;
    } catch (error) {
      console.error("Error creating product unit:", error);
      throw new Error("An error occurred while creating product unit.");
    }
  }

  async update(id, productUnit) {
    try {
      const query = `
      UPDATE product_unit
      SET description = $1
      WHERE id = $2`;
      const { description } = productUnit;
      const productUnitUpdate = await connection.query(query, [
        description,
        id,
      ]);

      return productUnitUpdate;
    } catch (error) {
      console.error("Error updating product unit:", error);
      throw new Error("An error occurred while updating product unit.");
    }
  }

  async destroy(id) {
    try {
      const query = `
      DELETE
      FROM product_unit
      WHERE id = $1`;
      const productUnitDestroyed = await connection.query(query, [id]);

      return productUnitDestroyed;
    } catch (error) {
      console.error("Error deleting product unit:", error);
      throw new Error("An error occurred while deleting product unit.");
    }
  }
}

export default new ProductUnitModels();
