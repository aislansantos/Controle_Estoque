import connection from "../../../config/Connection";

// variaveis resposaveis pelas mensagens de retorno.
const messages = {
  consoleError: (action) => `Error ${action} customer:`,
  anErrorOccurred: (action) => `An error occurred while ${action} customer.`,
};

class CustomerModels {
  async index() {
    const action = "fetching";
    try {
      const querySelect = `
        SELECT *
        FROM customer`;

      const customers = await connection.query(querySelect);

      return customers.rows;
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
      FROM customer
      WHERE id=$1`;

      const customer = await connection.query(querySelect, [id]);

      return customer.rows;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async create(customer) {
    const action = "creating";
    try {
      const query = `
      INSERT INTO customer (name, email, city)
      VALUES  ($1,$2,$3)
      RETURNING id, name, email, city`;

      const { name, email, city } = customer;
      const createdCustomer = await connection.query(query, [
        name,
        email,
        city,
      ]);
      return createdCustomer.rows[0];
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async update(id, idField, fieldsTitles, updateValues) {
    const action = "updating";
    try {
      const updateQuery = `
    UPDATE customer
    SET ${fieldsTitles}
    WHERE ${idField}`;

      await connection.query(updateQuery, [...updateValues, id]);
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }

  async destroy(id) {
    const action = "deleting";
    try {
      const customerToDestroy = await this.show(id);

      const deleteQuery = `
        DELETE
        FROM customer
        WHERE id = $1
        RETURNING *`; // Adiciona o RETURNING * para retornar os dados do cliente deletado

      await connection.query(deleteQuery, [id]);

      return customerToDestroy;
    } catch (error) {
      console.error(messages.consoleError(action), error.message);
      throw new Error(messages.anErrorOccurred(action));
    }
  }
}

export default new CustomerModels();
