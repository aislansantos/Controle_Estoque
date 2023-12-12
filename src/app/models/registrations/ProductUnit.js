import connection from "../../../config/Connection";

class ProductUnitModels {
  async index() {
    const query = `
      SELECT *
      FROM product_unit`;
    const productUnits = await connection.query(query);

    return productUnits.rows;
  }

  async show(id) {
    const query = `
      SELECT *
      FROM product_unit
      WHERE id = $1`;

    const productUnit = await connection.query(query, [id]);

    return productUnit.rows;
  }

  async create(productUnit) {
    const query = `
      INSERT
      INTO product_unit (description) VALUES ($1)`;
    const { description } = productUnit;
    const productUnitCreated = await connection.query(query, [description]);

    return productUnitCreated;
  }

  async update(id, productUnit) {
    const query = `
      UPDATE product_unit
      SET description = $1
      WHERE id = $2`;
    const { description } = productUnit;
    const productUnitUpdate = await connection.query(query, [description, id]);

    return productUnitUpdate;
  }

  async destroy(id) {
    const query = `
      DELETE
      FROM product_unit
      WHERE id = $1`;
    const productUnitDestroyed = await connection.query(query, [id]);

    return productUnitDestroyed;
  }
}

export default new ProductUnitModels();
