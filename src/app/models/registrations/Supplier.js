import connection from "../../../config/Connection";

class SupplierModels {
  async index() {
    const query = `
    SELECT *
    FROM supplier`;
    const suppliers = await connection.query(query);

    return suppliers.rows;
  }

  async show(id) {
    const query = `
      SELECT *
      FROM supplier
      WHERE id = $1`;
    const supplier = await connection.query(query, [id]);

    return supplier.rows;
  }

  async create(supplier) {
    const query = `
      INSERT
      INTO supplier (name, email)
      VALUES ($1, $2)`;
    const { name, email } = supplier;
    const createdSupplier = await connection.query(query, [name, email]);

    return createdSupplier.rowCount;
  }

  async update(id, supplier) {
    const query = `
      UPDATE supplier
      SET name = $1, email = $2
      WHERE id = $3`;
    const { name, email } = supplier;
    const updatedSupplier = await connection.query(query, [name, email, id]);

    return updatedSupplier;
  }

  async destroy(id) {
    const query = `
      DELETE
      FROM supplier
      WHERE id = $1`;
    const destroyedSupplier = await connection.query(query, [id]);

    return destroyedSupplier;
  }
}

export default new SupplierModels();
