import connection from "../../../config/Connection";

class ProductCategoryModels {
  async index() {
    try {
      const query = `
      SELECT *
      FROM product_category`;
      const productCategories = await connection.query(query);

      return productCategories.rows;
    } catch (error) {
      console.error("Error fetching product categories:", error);
      throw new Error("An error occurred while fetching product categories.");
    }
  }

  async show(id) {
    try {
      const query = `
      SELECT *
      FROM product_category
      WHERE id = $1`;
      const productCategory = await connection.query(query, [id]);

      return productCategory.rows;
    } catch (error) {
      console.error("Error fetching product category:", error);
      throw new Error("An error occurred while fetching product category.");
    }
  }

  async create(productCategory) {
    try {
      const { description } = productCategory;
      const query = `
      INSERT
      INTO product_category (description)
      VALUES ($1)`;
      const productCategoryCreated = await connection.query(query, [
        description,
      ]);

      return productCategoryCreated;
    } catch (error) {
      console.error("Error creating product category:", error);
      throw new Error("An error occurred while creating product category.");
    }
  }

  async update(id, productCategory) {
    try {
      const query = `
      UPDATE product_category
      SET description = $1
      WHERE id = $2`;
      const { description } = productCategory;

      const productCategoryUpdate = await connection.query(query, [
        description,
        id,
      ]);
      return productCategoryUpdate;
    } catch (error) {
      console.error("Error updating product category:", error);
      throw new Error("An error occurred while updating product category.");
    }
  }

  async destroy(id) {
    try {
      const query = `
      DELETE
      FROM product_category
      WHERE id = $1`;

      const productCategoryDestroyed = await connection.query(query, [id]);
      return productCategoryDestroyed;
    } catch (error) {
      console.error("Error deleting product category:", error);
      throw new Error("An error occurred while deleting product category.");
    }
  }
}

export default new ProductCategoryModels();
