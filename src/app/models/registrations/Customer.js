import connection from "../../../config/Connection";

class CustomerModels {
  async index() {
    const query = `
      SELECT *
      FROM customer`;
    const customers = await connection.query(query);

    return customers.rows;
  }

  async show(id) {
    const query = `
      SELECT *
      FROM customer
      WHERE id=$1`;
    const customer = await connection.query(query, [id]);

    return customer.rows;
  }

  async create(customer) {
    const query = `
      INSERT INTO customer (name, email, city)
      VALUES  ($1,$2,$3)`;

    const { name, email, city } = customer;
    const createdCustomer = await connection.query(query, [name, email, city]);
    return createdCustomer.rowCount;
  }

  async update(id, customer) {
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
  }

  async destroy(id) {
    const query = `
      DELETE
      FROM customer
      WHERE id = $1`;

    const destroyedCustomer = await connection.query(query, [id]);
    return destroyedCustomer.rowCount;
  }
}

export default new CustomerModels();
