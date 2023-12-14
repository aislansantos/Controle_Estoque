import connection from "../../../config/Connection";

class ProductModels {
  async index() {
    const query = `
      SELECT pr.id, pr.description, pc.description as category, pu.description as unit, pr.amount as amount
      FROM product pr
      INNER JOIN product_category pc ON pr.fk_id_category = pc.id
      INNER JOIN product_unit pu ON pr.fk_id_unit = pu.id
      ORDER BY id`;

    const products = await connection.query(query);
    return products.rows;
  }

  async show(id) {
    const query = `
      SELECT pr.id, pr.description, pc.description as category, pu.description as unit, pr.amount as amount
      FROM product pr
      INNER JOIN product_category pc ON pr.fk_id_category = pc.id
      INNER JOIN product_unit pu ON pr.fk_id_unit = pu.id
      WHERE pr.id = $1`;
    const product = await connection.query(query, [id]);

    return product.rows;
  }

  async create(product) {
    const query = `
    INSERT
    INTO product (description, amount, fk_id_unit, fk_id_category)
    VALUES ($1, $2, $3, $4)`;
    const { description, amount, FkIdUnit, FkIdCategory } = product;
    const productCreated = await connection.query(query, [
      description,
      amount,
      FkIdUnit,
      FkIdCategory,
    ]);

    return productCreated;
  }

  async update(id, product) {
    const { description, amount, FkIdUnit, FkIdCategory } = product;
    console.log(description, amount, FkIdUnit, FkIdCategory);
    const query = `
      UPDATE  product
      SET description = $1, amount = $2, fk_id_unit = $3, fk_id_category = $4
      WHERE id = $5`;
    const productUpdated = await connection.query(query, [
      description,
      amount,
      FkIdUnit,
      FkIdCategory,
      id,
    ]);

    return productUpdated;
  }

  async destroy(id) {
    const query = `
      DELETE
      FROM product
      WHERE id = $1`;
    const productDestroyed = await connection.query(query, [id]);

    return productDestroyed;
  }
}

export default new ProductModels();
