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

      return supplier.rows;
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

  async update(id, idField, fieldsTitles, updateValues) {
    try {
      const queryUpadate = `UPDATE supplier SET ${fieldsTitles} WHERE ${idField}`;

      console.log(id);
      console.log(idField);
      console.log(fieldsTitles);
      console.log(updateValues);
      console.log(queryUpadate);

      await connection.query(queryUpadate, [...updateValues, id]);
    } catch (error) {
      console.error("Error updating supplier:", error);
      throw new Error("An error occurred while updating supplier.");
    }
  }

  async destroy(id) {
    try {
      const supplierToDestroy = await this.show(id);

      const deleteQuery = `
      DELETE
      FROM supplier
      WHERE id = $1
      RETURNING *`;

      await connection.query(deleteQuery, [id]);

      return supplierToDestroy;
    } catch (error) {
      console.error("Error deleting supplier:", error);
      throw new Error("An error occurred while deleting supplier.");
    }
  }
}

export default new SupplierModels();
