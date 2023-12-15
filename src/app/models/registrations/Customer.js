import connection from "../../../config/Connection";

class CustomerModels {
  async index() {
    try {
      const query = `
        SELECT *
        FROM customer`;
      const customers = await connection.query(query);

      return customers.rows;
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
      return createdCustomer.rowCount;
    } catch (error) {
      console.error("Error creating customer:", error);
      throw new Error("An error occurred while creating a customer.");
    }
  }

  async update(id, customer) {
    try {
      const query = `
      UPDATE customer
      SET name = $1, email = $2, city =$3
      WHERE id = $4 `;

      const { name, email, city } = customer;
      const updatedCustomer = await connection.query(query, [
        name,
        email,
        city,
        id,
      ]);
      return updatedCustomer.rowCount;
    } catch (error) {
      console.error("Error updating customer:", error);
      throw new Error("An error while updating a customer.");
    }
  }

  async destroy(id) {
    try {
      const query = `
      DELETE
      FROM customer
      WHERE id = $1`;

      const destroyedCustomer = await connection.query(query, [id]);
      return destroyedCustomer.rowCount;
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw new Error("An error while deleting a customer.");
    }
  }
}

export default new CustomerModels();
