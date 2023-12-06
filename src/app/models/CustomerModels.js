import connection from "../../config/Connection";

class CustomerModels {
  async index() {
    const query = await "SELECT * FROM customer ORDER BY id";
    const conn = await connection.conn();
    const customers = await conn.query(query);
    return customers.rows;
  }

  async show(id) {
    const query = `SELECT * FROM customer WHERE id=$1`;
    const conn = await connection.conn();
    const customer = await conn.query(query, [id]);
    return customer.rows;
  }

  async create(customer) {
    const query = `INSERT INTO customer (name, email, city) VALUES  ($1,$2,$3)`;
    const { name, email, city } = customer;
    const conn = await connection.conn();
    const createdCustomer = await conn.query(query, [name, email, city]);
    return createdCustomer.rowCount;
  }

  async update(id, customer) {
    const query = `UPDATE customer SET name = $1, email = $2, city =$3 WHERE id = $4`;
    const { name, email, city } = customer;
    const conn = await connection.conn();
    const updatedCustomer = await conn.query(query, [name, email, city, id]);
    return updatedCustomer;
  }

  async destroy(id) {
    const query = `DELETE FROM customer WHERE id = $1`;
    const conn = await connection.conn();
    const removedCustomer = await conn.query(query, [id]);
    return removedCustomer;
  }
}

export default new CustomerModels();
