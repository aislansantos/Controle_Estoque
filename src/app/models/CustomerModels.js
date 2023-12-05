import connection from "../../config/Connection";

// require("dotenv").config();

class CustomerModels {
  async index() {
    const query = "SELECT * FROM customer";
    const customers = await connection.conn(query);
    return customers;
  }

  async show(id) {
    const query = `SELECT * FROM customer WHERE id = ${id}`;
    const [customer] = await connection.conn(query);
    return customer;
  }
}

export default new CustomerModels();
