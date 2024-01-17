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

  // async show() {}

  // async create() {}

  // async update() {}

  // async destroy() {}
}

export default new ItemPurchaseModels();
