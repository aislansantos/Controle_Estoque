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

    try {
      const sales = await conn.query(query);
      return sales.rows;
    } finally {
      await conn.end();
    }
  }

  async show(id) {
    const query = `
      SELECT sa.id, sa.order_number, sa.sale_order_ps, sa.order_date, sa.release_date, sa.expiration_date, cu.id as id_customer, cu.name as customer, se.id as id_seller, se.name as seller
      FROM sale sa
      INNER JOIN customer cu ON sa.fk_customer_id = cu.id
      INNER JOIN seller se ON sa.fk_seller_id = se.id
      WHERE sa.id = $1`;

    const queryItens = `
      SELECT pr.id, pr.description as product, si.quantity_item, si.unitary_value, si.total_value
      FROM sale_item si
      INNER JOIN product pr ON si.fk_product_id = pr.id
      INNER JOIN product_unit pu ON pr.fk_id_unit = pu.id
      INNER JOIN product_category pc ON pr.fk_id_category = pc.id
      INNER JOIN sale sa ON si.fk_sale_id = sa.id
      WHERE si.fk_sale_id = $1;`;

    const conn = await connection.conn();

    try {
      // Executar a consulta para obter os dados da venda
      const saleResult = await conn.query(query, [id]);
      const sale = saleResult.rows.length > 0 ? [saleResult.rows[0]] : [];

      // Executar a consulta para obter os itens da venda
      const saleItemResult = await conn.query(queryItens, [id]);
      const saleItems = saleItemResult.rows;

      // Adicionar a propriedade saleItems ao objeto sale, se houver resultados
      if (sale.length > 0) {
        sale[0].saleItems = saleItems;
      }

      // Retorna o array de objetos de venda
      return sale;
    } finally {
      await conn.end();
    }
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
    try {
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
    } finally {
      await conn.end();
    }
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

    try {
      const saleUpdated = await conn.query(query, [...updateValues, id]);

      return saleUpdated.rowCount;
    } finally {
      conn.end();
    }
  }

  async destroy(id) {
    const query = "DELETE FROM sale WHERE id = $1";
    const conn = await connection.conn();
    try {
      const saleDestroyed = await conn.query(query, [id]);
      return saleDestroyed;
    } finally {
      conn.end();
    }
  }
}

export default new SaleModels();
