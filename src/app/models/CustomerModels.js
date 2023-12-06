import connection from "../../config/Connection";

class CustomerModels {
  async index() {
    const query = await "SELECT * FROM customer";
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
    const { name, email, city } = customer;
    const query = `INSERT INTO customer (name, email, city) VALUES  ($1,$2,$3)`;
    const conn = await connection.conn();
    const createdCustomer = await conn.query(query, [name, email, city]);
    return createdCustomer.rowCount;
  }
}

export default new CustomerModels();
