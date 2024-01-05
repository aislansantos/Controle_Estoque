import connection from "../../../config/Connection";

// variaveis resposaveis pelas mensagens de retorno.
const messages = {
  consoleError: (action) => `Error ${action} supplier:`,
  anErrorOccurred: (action) => `An error occurred while ${action} supplier.`,
};

class SupplierModels {
  async index() {
    const action = "fetching";
    try {
      const querySelect = `
      SELECT *
      FROM supplier`;

      const suppliers = await connection.query(querySelect);

      return suppliers.rows;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async show(id) {
    const action = "fetching";
    try {
      const querySelect = `
      SELECT *
      FROM supplier
      WHERE id = $1`;
      const supplier = await connection.query(querySelect, [id]);

      return supplier.rows;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async create(supplier) {
    const action = "creating";
    try {
      const query = `
      INSERT INTO supplier (name, email)
      VALUES ($1, $2)`;

      const { name, email } = supplier;
      const createdSupplier = await connection.query(query, [name, email]);

      return createdSupplier.rows[0];
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async update(id, idField, fieldsTitles, updateValues) {
    const action = "updating";
    try {
      const queryUpadate = `UPDATE supplier SET ${fieldsTitles} WHERE ${idField}`;

      await connection.query(queryUpadate, [...updateValues, id]);
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async destroy(id) {
    const action = "deleting";
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
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }
}

export default new SupplierModels();
