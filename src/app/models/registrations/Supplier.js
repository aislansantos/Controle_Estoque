import connection from "../../../config/Connection";

class SupplierModels {
  async index() {
    const query = `
    SELECT *
    FROM supplier
    ORDER BY id`;
    const conn = await connection.conn();
    const suppliers = await conn.query(query);
    return suppliers.rows;
  }

  async show(id) {
    const query = `
      SELECT *
      FROM supplier
      WHERE id = $1`;
    const conn = await connection.conn();
    const supplier = await conn.query(query, [id]);
    return supplier.rows;
  }

  async create(supplier) {
    const query = `
      INSERT
      INTO supplier (name, email)
      VALUES ($1, $2)`;
    const { name, email } = supplier;
    const conn = await connection.conn();
    const createdSupplier = await conn.query(query, [name, email]);
    return createdSupplier.rowCount;
  }

  async update(id, supplier) {
    const query = `
      UPDATE supplier
      SET name = $1, email = $2
      WHERE id = $3`;
    const { name, email } = supplier;
    const conn = await connection.conn();
    const updatedSupplier = await conn.query(query, [name, email, id]);
    return updatedSupplier;
  }

  async destroy(id) {
    const query = `
      DELETE
      FROM supplier
      WHERE id = $1`;
    const conn = await connection.conn();
    const destroyedSupplier = await conn.query(query, [id]);
    return destroyedSupplier;
  }
}

export default new SupplierModels();
