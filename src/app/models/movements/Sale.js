import { DateTime } from "luxon"; //! essa biblioteca permite alterar as configurações de UTC para colocar a hora de São Paulo.
import connection from "../../../config/Connection";

class SaleModels {
  async index() {
    const query = `
    SELECT sa.id, sa.order_number, sa.sale_order_ps, sa.order_date,sa.release_date, sa.expiration_date,cu.id as id_customer ,cu.name as customer,se.id as id_seller, se.name as seller
    FROM sale sa
    INNER JOIN customer cu ON sa.fk_customer_id = cu.id
    INNER JOIN seller se ON sa.fk_seller_id = se.id`;
    const sales = await connection.query(query);

    return sales.rows;
  }

  async show(id) {
    try {
      const query = `
        SELECT
        DISTINCT ON (sa.id)
        sa.id,
        sa.order_number,
        sa.sale_order_ps,
        sa.order_date,
        sa.release_date,
        sa.expiration_date,
        cu.id as id_customer,
        cu.name as customer,
        se.id as id_seller,
        se.name as seller,
        SUM(si.total_value) OVER (PARTITION BY si.fk_sale_id) AS total_sale
      FROM sale sa
      INNER JOIN customer cu ON sa.fk_customer_id = cu.id
      INNER JOIN seller se ON sa.fk_seller_id = se.id
      INNER JOIN sale_item si ON si.fk_sale_id = sa.id
      WHERE sa.id = $1
      ORDER BY sa.id;`;

      const queryItens = `
        SELECT pr.id, pr.description as product, si.quantity_item, si.unitary_value, si.total_value
        FROM sale_item si
        INNER JOIN product pr ON si.fk_product_id = pr.id
        INNER JOIN product_unit pu ON pr.fk_id_unit = pu.id
        INNER JOIN product_category pc ON pr.fk_id_category = pc.id
        INNER JOIN sale sa ON si.fk_sale_id = sa.id
        WHERE si.fk_sale_id = $1;`;

      const saleResult = await connection.query(query, [id]);

      if (saleResult.rows.length > 0) {
        // Continue com o processamento apenas se houver resultados
        const saleItemResult = await connection.query(queryItens, [id]);
        const saleItem = saleItemResult.rows;

        // Certifique-se de que saleResult.rows[0] está definido antes de acessar e modificar suas propriedades
        saleResult.rows[0].saleItems = saleItem;
        return saleResult.rows;
      }
      // Retorna um array vazio se não houver resultados
      return [];
    } catch (error) {
      console.error(error);
      throw error;
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
    const saleCreated = await connection.query(query, [
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
    const saleUpdated = await connection.query(query, [...updateValues, id]);

    return saleUpdated.rowCount;
  }

  async destroy(id) {
    const query = "DELETE FROM sale WHERE id = $1";
    const saleDestroyed = await connection.query(query, [id]);

    return saleDestroyed;
  }
}

export default new SaleModels();
