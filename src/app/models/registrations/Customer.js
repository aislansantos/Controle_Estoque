import connection from "../../../config/Connection";

class CustomerModels {
  async index() {
    try {
      const querySelect = `
        SELECT *
        FROM customer`;

      const customers = await connection.query(querySelect);

      return customers.rows;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw new Error("An error occurred while fetching customers.");
    }
  }

  async show(id) {
    try {
      const querySelect = `
      SELECT *
      FROM customer
      WHERE id=$1`;

      const customer = await connection.query(querySelect, [id]);

      return customer.rows;
    } catch (error) {
      console.error("Error fetching customer:", error);
      throw new Error("An error occurred while fetching customer.");
    }
  }

  async create(customer) {
    try {
      const query = `
      INSERT INTO customer (name, email, city)
      VALUES  ($1,$2,$3)`;

      const { name, email, city } = customer;
      const createdCustomer = await connection.query(query, [
        name,
        email,
        city,
      ]);
      return createdCustomer.rows[0];
    } catch (error) {
      console.error("Error creating customer:", error);
      throw new Error("An error occurred while creating a customer.");
    }
  }

  async update(id, idField, fieldsTitles, updateValues) {
    try {
      const updateQuery = `
    UPDATE customer
    SET ${fieldsTitles}
    WHERE ${idField}`;

      await connection.query(updateQuery, [...updateValues, id]);
    } catch (error) {
      console.error("Error updating customer:", error);
      throw new Error("An error while updating a customer.");
    }
  }

  async destroy(id) {
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
      console.error("Error deleting customer:", error);
      throw new Error("An error occurred while deleting a customer.");
    }
  }
}

export default new CustomerModels();
