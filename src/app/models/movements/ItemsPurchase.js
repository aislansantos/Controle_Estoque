import connection from "../../../config/Connection";

class ItemPurchaseModels {
  async index(purchaseId) {
    try {
      const querySelect = `
        SELECT
          pi.id AS id_product_purchase,
          pr.id As id_product_cad,
          pr.description,
          pru.description as unit,
          pi.quantity_item,
          pi.unitary_value,
          pi.total_value,
          pc.description AS category
        FROM purchase_item pi
        INNER JOIN product pr ON pr.id = fk_product_id
        INNER JOIN product_category pc ON  pr.fk_id_category = pc.id
        INNER JOIN product_unit pru ON pr.fk_id_unit = pru.id
        WHERE fk_purchase_id = $1`;
      const itemsPuchase = await connection.query(querySelect, [purchaseId]);
      return itemsPuchase.rows;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while fetching items sale.");
    }
  }

  async show(purchaseId, ItemPurchaseId) {
    try {
      const querySelect = `
      SELECT
        pi.id AS id_product_purchase,
        pr.id AS id_product_cad,
        pr.description,
        pru.description AS unit,
        pi.quantity_item,
        pi.unitary_value,
        pi.total_value,
        pc.description AS category
      FROM purchase_item pi
      INNER JOIN product pr ON fk_product_id = pr.id
      INNER JOIN product_category pc ON pr.fk_id_category = pc.id
      INNER JOIN product_unit pru ON pr.fk_id_unit = pru.id
      WHERE fk_purchase_id = $1 and pi.id = $2`;

      const itemsPurchase = await connection.query(querySelect, [
        purchaseId,
        ItemPurchaseId,
      ]);

      return itemsPurchase.rows;
    } catch (error) {
      console.error("Error fetching item purchase:", error);
      throw new Error("An error ocurred while fetching item purchase.");
    }
  }

  async create(purchaseId, itemPurchase) {
    try {
      const queryCreate = `
      INSERT INTO purchase_item(quantity_item, unitary_value, total_value, fk_purchase_id, fk_product_id)
      VALUES($1, $2, $3, $4, $5)`;

      const { quantityItem, unitaryValue, fkProductId } = itemPurchase;
      const totalValue = quantityItem * unitaryValue;
      const itemPurchaseCreated = await connection.query(queryCreate, [
        quantityItem,
        unitaryValue,
        totalValue,
        purchaseId,
        fkProductId,
      ]);
      const queryUpdateAmount = `
        UPDATE product
        SET amount = amount + $1
        WHERE id = $2`;
      await connection.query(queryUpdateAmount, [quantityItem, fkProductId]);
      return itemPurchaseCreated.rows;
    } catch (error) {
      console.error(error);
      throw new Error("An error ocurred while creating purchase.");
    }
  }

  // async update() {}

  // async destroy() {}
}

export default new ItemPurchaseModels();
