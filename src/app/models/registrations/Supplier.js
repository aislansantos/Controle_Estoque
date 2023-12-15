import connection from "../../../config/Connection";

class SupplierModels {
  async index() {
    try {
      const query = `
      SELECT *
      FROM supplier`;
      const suppliers = await connection.query(query);

      return suppliers.rows;
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      throw new Error("An error occurred while fetching suppliers.");
    }
  }

  async show(id) {
    try {
      const query = `
      SELECT *
      FROM supplier
      WHERE id = $1`;
      const supplier = await connection.query(query, [id]);

      return supplier.rows;
    } catch (error) {
      console.error("Error fetching supplier:", error);
      throw new Error("An error occurred while fetching supplier.");
    }
  }

  async create(supplier) {
    try {
      const query = `
      INSERT
      INTO supplier (name, email)
      VALUES ($1, $2)`;
      const { name, email } = supplier;
      const createdSupplier = await connection.query(query, [name, email]);

      return createdSupplier.rowCount;
    } catch (error) {
      console.error("Error creating supplier:", error);
      throw new Error("An error occurred while creating supplier.");
    }
  }

  async update(id, supplier) {
    try {
      const query = `
      UPDATE supplier
      SET name = $1, email = $2
      WHERE id = $3`;
      const { name, email } = supplier;
      const updatedSupplier = await connection.query(query, [name, email, id]);

      return updatedSupplier;
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw new Error("An error occurred while updating supplier.");
    }
  }

  async destroy(id) {
    try {
      const query = `
      DELETE
      FROM supplier
      WHERE id = $1`;
      const destroyedSupplier = await connection.query(query, [id]);

      return destroyedSupplier;
    } catch (error) {
      console.error("Error deleting supplier:", error);
      throw new Error("An error occurred while deleting supplier.");
    }
  }
}

export default new SupplierModels();
