import connection from "../../../config/Connection";

class ItemSaleModels {
  async index(salesId) {
    try {
      const query = `
        SELECT
          si.id AS id_product_sale,
          pr.id AS id_product_cad,
          pr.description,
          pru.description AS unit,
          si.quantity_item,
          si.unitary_value,
          si.total_value,
          pc.description AS category
        FROM sale_item si
        INNER JOIN product pr ON pr.id = fk_product_id
        INNER JOIN product_category pc ON pr.fk_id_category = pc.id
        INNER JOIN product_unit pru ON pr.fk_id_unit = pru.id
        WHERE fk_sale_id = $1`;
      const itemsSale = await connection.query(query, [salesId]);
      return itemsSale.rows;
    } catch (error) {
      console.error("Error fetching items sale:", error);
      throw new Error("An error occurred while fetching items sale.");
    }
  }

  async show(salesId, ItemSaleId) {
    try {
      const query = `
    SELECT
      si.id AS id_product_sale,
      pr.id AS id_product_cad,
      pr.description,
      pu.description AS unit,
      si.quantity_item,
      si.unitary_value,
      si.total_value,
      pc.description AS category
    FROM sale_item si
    INNER JOIN product pr ON fk_product_id = pr.id
    INNER JOIN product_category pc ON pr.fk_id_category = pc.id
    INNER JOIN product_unit pu ON pr.fk_id_unit = pu.id
    WHERE fk_sale_id = $1 AND si.id = $2 `;
      const itemSales = await connection.query(query, [salesId, ItemSaleId]);

      return itemSales.rows;
    } catch (error) {
      console.error("Error fetching item sale:", error);
      throw new Error("An error occurred while fetching item sale.");
    }
  }

  async create(salesId, itemSale) {
    try {
      const queryCreate = `
      INSERT INTO sale_item (quantity_item, unitary_value, total_value, fk_sale_id, fk_product_id)
      VALUES ($1, $2, $3, $4, $5)`;
      const { quantityItem, unitaryValue, fkProductId } = itemSale;
      const totalValue = quantityItem * unitaryValue;
      const itemSalesCreated = await connection.query(queryCreate, [
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
    } catch (error) {
      console.error("Error creating item sale:", error);
      throw new Error("An error occurred while creating item sale.");
    }
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
      // Cria uma string com os nomes dos campos separados por vírgula para serem usados na cláusula SET do SQL
      const fieldsTitles = `${updateFields.join(", ")}`;
      // Armazena a string do campo fk_product_id para uso na cláusula WHERE do SQL
      const fkProductIdQuery = `${updateFields[updateFields.length - 2]}`;
      // Armazena a string do campo fk_sale_id para uso na cláusula WHERE do SQL
      const fkSaleIdQuery = `${updateFields[updateFields.length - 1]}`;

      // ? Referente  ao retorno da quantidade do produto quando ele é trocado no update
      // Consulta que retorna o id do produto no cadastro e a quantidade que vamos retornar para o estoque
      const queryOldItemSale = `
        SELECT fk_product_id, quantity_item
        FROM sale_item
        WHERE fk_sale_id = $1 AND id = $2`;

      // Executa a consulta SQL para obter o produto antigo e a quantidade vendida, com base no ID da venda e no ID do item de venda.
      const oldProductResult = await connection.query(queryOldItemSale, [
        saleId,
        id,
      ]);

      if (oldProductResult.rows.length === 0) {
        throw new Error("Sale item not found.");
      }
      const { fk_product_id: oldProductId, quantity_item: oldQuantity } =
        oldProductResult.rows[0];

      // Consulta retorna o estoque atual para fazer o processo de soma com o produto que está voltando.
      const queryAmountProductAdjust = `
        SELECT amount
        FROM product
        WHERE id = $1`;
      const amountProductAdjust = await connection.query(
        queryAmountProductAdjust,
        [oldProductId]
      );

      if (amountProductAdjust.rows.length === 0) {
        throw new Error("Product not found.");
      }

      const currentAmount = amountProductAdjust.rows[0].amount;

      // Valor que será atribuído ao estoque no cadastro do produto
      const amountUpdated = currentAmount + oldQuantity;

      // Consulta que executa o retorno do quantidade item que saiu da lista
      const queryAdjustAmount = `
        UPDATE product
        SET amount = $1
        WHERE id = $2 RETURNING *`; // Adicionado o RETURNING * para obter o resultado da atualização
      await connection.query(queryAdjustAmount, [amountUpdated, oldProductId]);

      // ? Referente à saída da quantidade do produto quando ele é trocado no update
      const queryAmountNewProduct = `
        SELECT amount
        FROM product
        WHERE id = $1`;
      const amountNewProduct = await connection.query(queryAmountNewProduct, [
        fkProductId,
      ]);

      if (amountNewProduct.rows.length === 0) {
        throw new Error("New product not found.");
      }

      const newAmountProduct = amountNewProduct.rows[0].amount - quantityItem;

      const queryUpdateAmountNewProduct = `
        UPDATE product
        SET amount = $1
        WHERE id = $2`;

      await connection.query(queryUpdateAmountNewProduct, [
        newAmountProduct,
        fkProductId,
      ]);

      // Constrói consulta SQL de atualização no pedido
      const query = `UPDATE sale_item SET ${fieldsTitles} WHERE ${fkProductIdQuery} AND ${fkSaleIdQuery}`;
      const itemSaleUpdated = await connection.query(query, updateValues);

      // Retorna o número de linhas afetadas pela atualização
      return itemSaleUpdated.rowCount;
    } catch (error) {
      console.error("Error updating itam sale:", error);
      throw new Error("An error occurred while updating item sale.");
    }
  }

  async destroy(saleId, id) {
    try {
      const queryDestroy = `
        DELETE FROM sale_item
        WHERE fk_sale_id = $1 AND id = $2`;
      const saleItemDestoyed = connection.query(queryDestroy, [saleId, id]);
      return saleItemDestoyed;
    } catch (error) {
      console.error("Error deleting item sale:", error);
      throw new Error("An error occurred while deleting item sale.");
    }
  }
}

export default new ItemSaleModels();
