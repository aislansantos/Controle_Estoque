import connection from "../../config/Connection";

class ProductModels {
  async index() {
    const query = `
      SELECT pr.id, pr.description, pc.description as category, pu.description as unit, pr.amount as amount
      FROM product pr
      INNER JOIN product_category pc ON pr.id_category = pc.id
      INNER JOIN product_unit pu ON pr.id_unit = pu.id
      ORDER BY id`;
    const conn = await connection.conn();
    const products = await conn.query(query);
    return products.rows;
  }

  async show(id) {
    const query = `
      SELECT pr.id, pr.description, pc.description as category, pu.description as unit, pr.amount as amount
      FROM product pr
      INNER JOIN product_category pc ON pr.id_category = pc.id
      INNER JOIN product_unit pu ON pr.id_unit = pu.id
      WHERE pr.id = $1`;
    const conn = await connection.conn();
    const product = await conn.query(query, [id]);
    return product.rows;
  }

  async create(product) {
    const { description, amount, idUnit, idCategory } = product;
    const query = `
      INSERT
      INTO product (description, amount, id_unit, id_category)
      VALUES ($1, $2, $3, $4)`;
    const conn = await connection.conn();
    const productCreated = await conn.query(query, [
      description,
      amount,
      idUnit,
      idCategory,
    ]);
    return productCreated;
  }

  async update(id, product) {
    const { description, amount, idUnit, idCategory } = product;
    const query = `
      UPDATE  product
      SET description = $1, amount = $2, id_unit = $3, id_category = $4
      WHERE id = $5`;
    const conn = await connection.conn();
    const productUpdated = await conn.query(query, [
      description,
      amount,
      idUnit,
      idCategory,
      id,
    ]);
    return productUpdated;
  }

  async destroy(id) {
    const query = `
      DELETE
      FROM product
      WHERE id = $1`;
    const conn = await connection.conn();
    const productDestroyed = await conn.query(query, [id]);
    return productDestroyed;
  }
}

export default new ProductModels();
