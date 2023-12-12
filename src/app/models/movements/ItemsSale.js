import connection from "../../../config/Connection";

class ItemSaleModels {
  async index(salesId) {
    const query = `
      SELECT si.id AS id_product_sale,pr.id AS id_product_cad, pr.description, pu.description AS unit, si.quantity_item, si.unitary_value, si.total_value, pc.description AS category
      FROM sale_item si
      INNER JOIN product pr ON pr.id = fk_product_id
      INNER JOIN product_category pc ON pr.fk_id_category = pc.id
      INNER JOIN product_unit pu ON pr.fk_id_unit = pu.id
      WHERE fk_sale_id = $1`;
    const itemsSales = await connection.query(query, [salesId]);

    return itemsSales.rows;
  }

  async show(salesId, id) {
    const query = `
      SELECT si.id AS id_product_sale, pr.id AS id_product_cad, pr.description, pu.description AS unit, si.quantity_item, si.unitary_value, si.total_value, pc.description AS category
      FROM sale_item si
      INNER JOIN product pr ON fk_product_id = pr.id
      INNER JOIN product_category pc ON pr.fk_id_category = pc.id
      INNER JOIN product_unit pu ON pr.fk_id_unit = pu.id
      WHERE fk_sale_id =$1 AND si.id =$2 `;
    const itemSales = await connection.query(query, [salesId, id]);

    return itemSales.rows;
  }

  async create(salesId, itenVenda) {
    const query = `
      INSERT INTO sale_item (quantity_item, unitary_value, total_value, fk_sale_id, fk_product_id)
      VALUES ($1, $2, $3, $4, $5)`;
    const { quantityItem, unitaryValue, fkProductId } = itenVenda;
    const totalValue = quantityItem * unitaryValue;
    const itemSalesCreated = await connection.query(query, [
      quantityItem,
      unitaryValue,
      totalValue,
      salesId,
      fkProductId,
    ]);
    const queryUpdateAmount = `
      UPDATE product
      SET amount = amount - $1
      WHERE id = $2`;
    await connection.query(queryUpdateAmount, [quantityItem, fkProductId]);
    return itemSalesCreated.rows;
  }

  async update() {}

  async destroy() {}
}

export default new ItemSaleModels();
