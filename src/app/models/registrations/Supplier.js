import connection from "../../../config/Connection";

class SupplierModels {
  async index() {
    try {
      const querySelect = `
      SELECT *
      FROM supplier`;

      const suppliers = await connection.query(querySelect);

      return suppliers.rows;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw new Error("An error occurred while fetching suppliers.");
    }
  }

  async show(id) {
    try {
      const querySelect = `
      SELECT *
      FROM supplier
      WHERE id = $1`;
      const supplier = await connection.query(querySelect, [id]);

      return supplier.rows[0];
    } catch (error) {
      console.error("Error fetching supplier:", error);
      throw new Error("An error occurred while fetching supplier.");
    }
  }

  async create(supplier) {
    try {
      const query = `
      INSERT INTO supplier (name, email)
      VALUES ($1, $2)`;

      const { name, email } = supplier;
      const createdSupplier = await connection.query(query, [name, email]);

      return createdSupplier.rows[0];
    } catch (error) {
      console.error("Error creating supplier:", error);
      throw new Error("An error occurred while creating supplier.");
    }
  }

  async update(id, supplier) {
    try {
      const supplierToUpdate = await this.show(id);

      const queryUpadate = `
      UPDATE supplier
      SET name = $1, email = $2
      WHERE id = $3
      RETURNING *`;
      const { name, email } = supplier;

      await connection.query(queryUpadate, [name, email, id]);

      return supplierToUpdate;
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw new Error("An error occurred while updating supplier.");
    }
  }

  async destroy(id) {
    try {
      const supplierToDelete = await this.show(id);

      const queryDelete = `
      DELETE
      FROM supplier
      WHERE id = $1`;

      await connection.query(queryDelete, [id]);

      return supplierToDelete.rows[0];
    } catch (error) {
      console.error("Error deleting supplier:", error);
      throw new Error("An error occurred while deleting supplier.");
    }
  }
}

export default new SupplierModels();
