import { DateTime } from "luxon"; //! essa biblioteca permite alterar as configurações de UTC para colocar a hora de São Paulo.
import connection from "../../../config/Connection";
import itemsSalesModels from "./ItemsSale";


class SaleModels {
  async index() {
    try {
      const querySelect = `
      SELECT
        sa.id,
        sa.order_number,
        sa.sale_order_ps,
        sa.order_date,
        sa.release_date,
        sa.expiration_date,
        cu.id AS id_customer,
        cu.name AS customer,
        se.id AS id_seller,
        se.name AS seller,
      COALESCE(total_sale, 0) AS total_sale
      FROM sale sa
      INNER JOIN customer cu ON sa.fk_customer_id = cu.id
      INNER JOIN seller se ON sa.fk_seller_id = se.id
      LEFT JOIN (
        SELECT fk_sale_id, SUM(total_value) AS total_sale
        FROM sale_item
        GROUP BY fk_sale_id
      ) si ON si.fk_sale_id = sa.id`;

      const sales = await connection.query(querySelect);

      return sales.rows;
    } catch (error) {
      console.error("Error fetching sales:", error);
      throw new Error("An error occurred while fetching sales.");
    }
  }

  async show(saleId) {
    try {
      // Consulta principal
      const querySelectSale = `
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
          COALESCE(SUM(si.total_value) OVER (PARTITION BY si.fk_sale_id), 0) AS total_sale
        FROM sale sa
        INNER JOIN customer cu ON sa.fk_customer_id = cu.id
        INNER JOIN seller se ON sa.fk_seller_id = se.id
        LEFT JOIN sale_item si ON si.fk_sale_id = sa.id
        WHERE sa.id = $1
        ORDER BY sa.id;`;


      const saleResult = await connection.query(querySelectSale, [saleId]);

      if (saleResult.rows.length > 0) {
        const saleItem = await itemsSalesModels.index(saleId);

        saleResult.rows[0].saleItems = saleItem;
        return saleResult.rows;
      }
      // Retorna um array vazio se não houver resultados
      return [];
    } catch (error) {
      console.error("Error fetching sale:", error);
      throw new Error("An error occurred while fetching sale.");
    }
  }

  async create(sale) {
    try {
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
    } catch (error) {
      console.error("Error creating sale:", error);
      throw new Error("An error occurred while create sale.");
    }
  }

  async update(saleId, updatedSaleData) {
    try {
      const updateQuery = Object.keys(updatedSaleData)
        .map(
          (key, index) =>
            `${key.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase()} = $${
              index + 1
            }`
        )
        .join(", ");
      const updateValues = Object.values(updatedSaleData);
      const query = `
        UPDATE sale
        SET  ${updateQuery}
        WHERE id = $${updateValues.length + 1}
        `;
      const saleUpdatedResult = await connection.query(query, [
        ...updateValues,
        saleId,
      ]);

      return saleUpdatedResult.rowCount;
    } catch (error) {
      console.error("Error updating sale:", error);
      throw new Error("An error occurred while updating sale.");
    }
  }

  async destroy(saleId) {
    try {
      const query = "DELETE FROM sale WHERE id = $1";
      const saleDestroyed = await connection.query(query, [saleId]);

      return saleDestroyed;
    } catch (error) {
      console.error("Error delating sale:", error);
      throw new Error("An error occurred while deleting sale.");
    }
  }
}

export default new SaleModels();
