import connection from "../../../config/Connection";

class ProductUnitModels {
  async index() {
    const query = `
      SELECT *
      FROM product_unit`;
    const conn = await connection.conn();
    const productUnits = await conn.query(query);
    return productUnits.rows;
  }

  async show(id) {
    const query = `
      SELECT *
      FROM product_unit
      WHERE id = $1`;
    const conn = await connection.conn();
    const productUnit = await conn.query(query, [id]);
    return productUnit.rows;
  }

  async create(productUnit) {
    const query = `
      INSERT
      INTO product_unit (description) VALUES ($1)`;
    const { description } = productUnit;
    const conn = await connection.conn();
    const productUnitCreated = await conn.query(query, [description]);
    return productUnitCreated;
  }

  async update(id, productUnit) {
    const query = `
      UPDATE product_unit
      SET description = $1
      WHERE id = $2`;
    const { description } = productUnit;
    const conn = await connection.conn();
    const productUnitUpdate = await conn.query(query, [description, id]);
    return productUnitUpdate;
  }

  async destroy(id) {
    const query = `
      DELETE
      FROM product_unit
      WHERE id = $1`;
    const conn = await connection.conn();
    const productUnitDestroyed = await conn.query(query, [id]);
    return productUnitDestroyed;
  }
}

export default new ProductUnitModels();
