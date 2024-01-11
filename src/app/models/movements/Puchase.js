import { DateTime } from "luxon";
import connection from "../../../config/Connection";

class PurchaseModels {
  async index() {
    try {
      const querySelect = `
      SELECT
        pu.id,
        pu.order_number,
        pu.purchase_order_ps,
        pu.order_date,
        pu.release_date,
        pu.expiration_date,
        su.id AS id_supplier,
        su.name AS supplier
        --COALESCE(total_purchase, 0) AS total_purchase
      FROM purchase pu
      INNER JOIN supplier su ON pu.fk_supplier_id = su.id`;

      const purchase = await connection.query(querySelect);

      return purchase.rows;
    } catch (error) {
      console.error(error);
      throw new Error("An Error fetching purchases.");
    }
  }

  async show(id) {
    try {
      const querySelectPurchase = `
    SELECT
      pu.id,
      pu.order_number,
      pu.purchase_order_ps,
      pu.order_date,
      pu.release_date,
      pu.expiration_date,
      su.id AS id_supplier,
      su.name AS supplier
      --COALESCE(total_purchase, 0) AS total_purchase
    FROM purchase pu
    INNER JOIN supplier su ON pu.fk_supplier_id = su.id
    WHERE pu.id = $1
    ORDER BY pu.id`;

      //! Depois de implementar as pesquisar de itens, voltar e colocar os items do pedido no show

      const purchaseResult = await connection.query(querySelectPurchase, [id]);

      console.log(purchaseResult.rows);

      if (purchaseResult.rows.length > 0) {
        return purchaseResult.rows;
      }

      return [];
    } catch (error) {
      console.error(error);
      throw new Error("An error while fetching purchase.");
    }
  }

  async create(purchase) {
    try {
      const queryCreate = `
      INSERT
      INTO purchase(order_number, purchase_order_ps, order_date, release_date, expiration_date, fk_supplier_id)
      VALUE($1, $2, $3, $4, $5, $6)`;
      const {
        orderNumber,
        purchaseOrderPs,
        orderDate,
        expirationDate,
        fkSupplierId,
      } = purchase;
      const sauPauloTimeZone = "America/Sao_Paulo";
      const dataReleaseUTC = DateTime.now().setZone(sauPauloTimeZone).toISO();
      const purchaseCreated = await connection.query(queryCreate, [
        orderNumber,
        purchaseOrderPs,
        orderDate,
        dataReleaseUTC,
        expirationDate,
        fkSupplierId,
      ]);

      return purchaseCreated.rowCount;
    } catch (error) {
      console.error(`Error creating purchase: ${error}`);
      throw new Error("An error ocurred while create purchase.");
    }
  }

  // async update() {}

  // async destroy() {}
}

export default new PurchaseModels();
