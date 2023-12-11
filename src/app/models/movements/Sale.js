import { DateTime } from "luxon"; //! essa biblioteca permite alterar as configurações de UTC para colocar a hora de São Paulo.
import connection from "../../../config/Connection";

class SaleModels {
  async index() {
    const query = `
    SELECT sa.id, sa.order_number, sa.sale_order_ps, sa.order_date,sa.release_date, sa.expiration_date,cu.id as id_customer ,cu.name as customer,se.id as id_seller, se.name as seller
    FROM sale sa
    INNER JOIN customer cu ON sa.fk_customer_id = cu.id
    INNER JOIN seller se ON sa.fk_seller_id = se.id`;
    const conn = await connection.conn();
    const sales = await conn.query(query);
    return sales.rows;
  }

  async show(id) {
    const query = `
    SELECT sa.id, sa.order_number, sa.sale_order_ps, sa.order_date,sa.release_date, sa.expiration_date,cu.id as id_customer ,cu.name as customer,se.id as id_seller, se.name as seller
    FROM sale sa
    INNER JOIN customer cu ON sa.fk_customer_id = cu.id
    INNER JOIN seller se ON sa.fk_seller_id = se.id
    WHERE sa.id = $1`;
    const conn = await connection.conn();
    const sale = await conn.query(query, [id]);
    return sale.rows;
  }

  async create(sale) {
    const query = `
    INSERT
    INTO sale( order_number, sale_order_ps, order_date, release_date, expiration_date, fk_customer_id, fk_seller_id)
    VALUES ($1, $2, $3,$4 ,$5 ,$6 ,$7)`;
    const {
      orderNumber,
      saleOrderPs,
      orderDate,
      expirationDate,
      fkCustomerId,
      fkSellerId,
    } = sale;

    const saoPauloTimeZone = "America/Sao_Paulo";

    const releaseDateUTC = DateTime.now().setZone(saoPauloTimeZone).toISO();
    const conn = await connection.conn();
    const saleCreated = await conn.query(query, [
      orderNumber,
      saleOrderPs,
      orderDate,
      releaseDateUTC,
      expirationDate,
      fkCustomerId,
      fkSellerId,
    ]);
    return saleCreated.rowCount;
  }

  async update(id, sale) {
    const conn = await connection.conn();
    const updates = sale;
    const updateQuery = Object.keys(updates)
      .map(
        (key, index) =>
          `${key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase()} = $${
            index + 1
          }`
      )
      .join(", ");
    const updateValues = Object.values(sale);
    const query = `
       UPDATE sale
       SET  ${updateQuery}
       WHERE id = $${updateValues.length + 1}
     `;
    const saleUpdated = await conn.query(query, [...updateValues, id]);

    return saleUpdated.rowCount;
  }

  async destroy(id) {
    const query = "DELETE FROM sale WHERE id = $1";
    const conn = await connection.conn();
    const saleDestroyed = await conn.query(query, [id]);
    return saleDestroyed;
  }
}

export default new SaleModels();
