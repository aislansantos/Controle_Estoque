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

  async show(purchaseId) {
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

      const purchaseResult = await connection.query(querySelectPurchase, [
        purchaseId,
      ]);

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
      VALUES ($1, $2, $3, $4, $5, $6)`;
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

  async update(purchaseId, updatedPurchaseData) {
    try {
      const updateColumns = Object.keys(updatedPurchaseData)
        .map(
          (key, index) =>
            `${key
              .replace(/([a-z])([A-Z])/g, "$1_$2")
              .toLocaleLowerCase()} = $${index + 1}`
        )
        .join(", ");

      const updateValues = Object.values(updatedPurchaseData);
      const query = `
              UPDATE purchase
              SET ${updateColumns}
              WHERE id = $${updateValues.length + 1}
      `;

      const purchaseUpdatedResult = await connection.query(query, [
        ...updateValues,
        purchaseId,
      ]);

      return purchaseUpdatedResult.rowCount;
    } catch (error) {
      console.error(`Error updating purchase: ${error}`);
      throw new Error(`An error ocurred while updating purchase`);
    }
  }

  async destroy(purchaseId) {
    try {
      const queryDelete = "DELETE FROM purchase WHERE id = $1";
      const purchaseDestroyed = await connection.query(queryDelete, [
        purchaseId,
      ]);

      return purchaseDestroyed;
    } catch (error) {
      console.error(`Error deleting purchase: ${error}`);
      throw new Error("An error ocurred while deleting ");
    }
  }
}

export default new PurchaseModels();
