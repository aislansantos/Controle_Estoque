import connection from "../../../config/Connection";

class CustomerModels {
  async index() {
    try {
      const querySelect = `
        SELECT *
        FROM customer`;
      const customers = await connection.query(querySelect);

      if (customers.rows.length > 0) {
        return customers.rows;
      }
      return null;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw new Error("An error occurred while fetching customers.");
    }
  }

  async show(id) {
    try {
      const query = `
      SELECT *
      FROM customer
      WHERE id=$1`;
      const customer = await connection.query(query, [id]);

      if (customer.rows.length > 0) {
        return customer.rows[0];
      }
      return null;
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

  async update(id, customer) {
    try {
      const selectQuery = `
      SELECT *
      FROM customer
      WHERE id = $1`;

      const updateQuery = `
      UPDATE customer
      SET name = $1, email = $2, city =$3
      WHERE id = $4
      RETURNING *`;

      const customerToUpdate = await connection.query(selectQuery, [id]);

      const { name, email, city } = customer;

      const updatedCustomer = await connection.query(updateQuery, [
        name,
        email,
        city,
        id,
      ]);

      return customerToUpdate.rows[0];
    } catch (error) {
      console.error("Error updating customer:", error);
      throw new Error("An error while updating a customer.");
    }
  }

  async destroy(id) {
    try {
      const selectQuery = `
        SELECT *
        FROM customer
        WHERE id = $1`;

      const deleteQuery = `
        DELETE
        FROM customer
        WHERE id = $1
        RETURNING *`; // Adiciona o RETURNING * para retornar os dados do cliente deletado

      // Primeiro, seleciona os dados do cliente que será excluído
      const customerToDestroy = await connection.query(selectQuery, [id]);

      // Em seguida, executa a exclusão e retorna os dados do cliente
      const destroyedCustomer = await connection.query(deleteQuery, [id]);

      return customerToDestroy.rows[0]; // Retorna os dados do cliente deletado
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw new Error("An error occurred while deleting a customer.");
    }
  }
}

export default new CustomerModels();
