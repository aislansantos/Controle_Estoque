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

  // Função para atualizar um item de venda
  async update(itemSale, saleId, id) {
    try {
      // Desestruturação dos parâmetros recebidos
      const { quantityItem = 0, unitaryValue = 0, fkProductId } = itemSale;

      // Verifica se o produto com o ID fornecido existe, se fkProductId estiver presente
      if (fkProductId === undefined) {
        console.log("Invalid fkProductId.");
        return 0;
      }

      // Inicializa as variáveis de campos e valores para a atualização
      const updateFields = [];
      const updateValues = [];
      // Adiciona campos e valores apenas se estiverem presentes no corpo da requisição
      if (quantityItem !== undefined) {
        updateFields.push(`quantity_item = $${updateValues.length + 1}`);
        updateValues.push(quantityItem);
      }

      if (unitaryValue !== undefined) {
        updateFields.push(`unitary_value = $${updateValues.length + 1}`);
        updateValues.push(unitaryValue);
      }

      if (fkProductId !== undefined) {
        updateFields.push(`fk_product_id = $${updateValues.length + 1}`);
        updateValues.push(fkProductId);
      }

      // Calcula o novo valor para total_value apenas se quantityItem e unitaryValue estiverem presentes
      const newTotalValue =
        quantityItem !== undefined && unitaryValue !== undefined
          ? quantityItem * unitaryValue
          : 0;

      updateFields.push(`total_value = $${updateValues.length + 1}`);
      updateValues.push(newTotalValue);

      // Adiciona os campos para a condição WHERE
      updateFields.push(`fk_sale_id = $${updateValues.length + 1}`);
      updateValues.push(saleId);
      updateFields.push(`id = $${updateValues.length + 1}`);
      updateValues.push(id);

      // Converte os campos em uma string formatada para a cláusula SET da consulta SQL
      const camposHolders = `${updateFields.join(", ")}`;
      const fkProductIdQuery = `${updateFields[updateFields.length - 2]}`;
      const fkSaleIdQuery = `${updateFields[updateFields.length - 1]}`;

      // ? Referente  ao retorno da quantidade do produto quando ele é trocado no update
      // Consulta que retorna o id do pdoduto no cadastro e a quantidade que vamos retornar para o estoque
      const queryOldItemSale = `
        SELECT *
        FROM sale_item
        WHERE fk_sale_id = $1 AND id = $2`;
      const returnOldProduct = await connection.query(queryOldItemSale, [
        saleId,
        id,
      ]);
      // Id do produto que temos de usar na consulta abaixo
      const OldItemSaletId = returnOldProduct.rows[0].fk_product_id;

      // Constulta retorna o estoque atual para fazer o processo de soma com o produto que esta voltando.
      const queryAmoutProductAdjust = `
        SELECT *
        FROM product
        WHERE id = $1`;
      const AmoutProductAdjust = await connection.query(
        queryAmoutProductAdjust,
        [OldItemSaletId]
      );
      // Valor que vai ser atribuido ao estoque no cadastro do produto
      const amountUpdated =
        AmoutProductAdjust.rows[0].amount +
        returnOldProduct.rows[0].quantity_item;

      // Consulta que executa o retorno do item que saiu da lista
      const queryAdjustAmount = `UPDATE product SET amount = $1 WHERE id = $2`;
      await connection.query(queryAdjustAmount, [
        amountUpdated,
        OldItemSaletId,
      ]);

      // Constrói consulta SQL de atualização no pedido
      const query = `UPDATE sale_item SET ${camposHolders} WHERE ${fkProductIdQuery} AND ${fkSaleIdQuery}`;
      const itemSaleUpdated = await connection.query(query, updateValues);

      // Retorna o número de linhas afetadas pela atualização
      return itemSaleUpdated.rowCount;
    } catch (error) {
      // Em caso de erro, exibe uma mensagem e retorna 0
      console.error("Error during update:", error);
      return 0;
    }
  }

  async destroy(saleId, id) {
    const query = `DELETE FROM sale_item WHERE fk_sale_id = $1 AND id = $2`;
    const saleItemDestoyed = connection.query(query, [saleId, id]);
    return saleItemDestoyed;
  }
}

export default new ItemSaleModels();
