import connection from "../../../config/Connection";

class ProductCategoryModels {
  async index() {
    const query = `
      SELECT *
      FROM product_category`;
    const conn = await connection.conn();
    const productCategories = await conn.query(query);
    return productCategories.rows;
  }

  async show(id) {
    const query = `
      SELECT *
      FROM product_category
      WHERE id = $1`;
    const conn = await connection.conn();
    const productCategory = await conn.query(query, [id]);
    return productCategory.rows;
  }

  async create(productCategory) {
    const query = `
      INSERT
      INTO product_category (description)
      VALUES ($1)`;
    const { description } = productCategory;
    const conn = await connection.conn();
    const productCategoryCreated = await conn.query(query, [description]);
    return productCategoryCreated;
  }

  async update(id, productCategory) {
    const query = `
      UPDATE product_category
      SET description = $1
      WHERE id = $2`;
    const { description } = productCategory;
    const conn = await connection.conn();
    const productCategoryUpdate = await conn.query(query, [description, id]);
    return productCategoryUpdate;
  }

  async destroy(id) {
    const query = `
      DELETE
      FROM product_category
      WHERE id = $1`;
    const conn = await connection.conn();
    const productCategoryDestroyed = await conn.query(query, [id]);
    return productCategoryDestroyed;
  }
}

export default new ProductCategoryModels();
