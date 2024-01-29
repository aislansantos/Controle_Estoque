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

  async update(itemPurchase, purchaseId, itemId) {
    try {
      // Desestruturação da compra recebida com parâmetro
      // quatityItem e unitaryItem são inializados zerado, pois na falta de um dos dois campos o total fica zerado sem dar erro
      const { quantityItem = 0, unitaryValue = 0, fkProductId } = itemPurchase;
      // Virifica se os produtos com o ID fornecido existe, se fkProductId estiver presente
      if (fkProductId === undefined) {
        console.log("Inválid fkProductId.");
        return 0;
      }

      // Inicializa as variáveis(arrays) de campos e valores para montar o SQL da atualização.
      const updateFields = [];
      const updateValues = [];

      // Adiciona campos e valores apenas se estiverem presentes no body da requisição
      // Virifica se foi passada a quantidade dentro do itemPurchase
      if (quantityItem !== undefined) {
        updateFields.push(`quantity_item = $${updateValues.length + 1}`);
        updateValues.push(quantityItem);
      }

      // Verifica se valor unitário
      if (unitaryValue !== undefined) {
        updateFields.push(`unitary_value = $${updateValues.length + 1}`);
        updateValues.push(unitaryValue);
      }

      // Verifica se existe uma id de produto
      if (fkProductId !== undefined) {
        updateFields.push(`fk_product_id = $${updateValues.length + 1}`);
        updateValues.push(fkProductId);
      }

      // Calcula o novo valoe para o total_value apensa se quantityItem e unitaryItem estiverem presentes, caso contrario o novo total é zero
      const newTotalValue =
        quantityItem !== undefined && unitaryValue !== undefined
          ? quantityItem * unitaryValue
          : 0;

      updateFields.push(`total_value = $${updateValues.length + 1}`);
      updateValues.push(newTotalValue);

      // Adiciona os campos para a condição WHERE
      updateFields.push(`fk_purchase_id = $${updateValues.length + 1}`);
      updateValues.push(purchaseId);
      updateFields.push(`id = $${updateValues.length + 1}`);
      updateValues.push(itemId);

      // Converte is campos  em uma string formatada para a cláusula SET da consulta SQL
      // Cria uma strig com os nome dos campos separador por virgula para sete usados no SET do SQL
      const fieldsTitles = `${updateFields.join(", ")}`;
      // Armazena a string do campo fk_product_id para uso na cláusula WHERE do SQL
      const fkProductIdQuery = `${updateFields[updateValues.length - 2]}`;
      // Armazena a string do campos fk_purchase_id para a cláusula WHERE do SQL
      const fkPurchaseQuery = `${updateFields[updateFields.length - 1]}`;

      // ? Referente a saida da quantidade do produto quando ele é trocado no update de compra
      // Consulta que retorna o id do produto no cadastro e a quantidade que vamos  diminuir
      const queryOldItemSale = `
        SELECT fk_product_id, quantity_item
        FROM purchase_item
        WHERE fk_purchase_id = $1 AND id = $2`;

      const oldProductResult = await connection.query(queryOldItemSale, [
        purchaseId,
        itemId,
      ]);

      if (oldProductResult.rows.length === 0) {
        throw new Error("Purchase item not found");
      }

      const { fk_product_id: oldProductId, quantity_item: oldQuantity } =
        oldProductResult.rows[0];

      // Consulta retorna o estoque atual para fazer processo de soma com o produto que esta saindo do estoque.
      const queryAmountOldProductAjust = `
        SELECT amount
        FROM product
        WHERE id = $1`;

      const amountProductAdjust = await connection.query(
        queryAmountOldProductAjust,
        [oldProductId]
      );

      if (amountProductAdjust.rows.length === 0) {
        throw new Error("Product not found.");
      }

      const currentAmount = amountProductAdjust.rows[0].amount;

      // Valor que será atribuido ao estoque do produtor.
      const amountUpdated = currentAmount - oldQuantity;

      // Consulta qye executa a saida da quantidade do produto
      const queryAdjustAmountOldProduct = `
        UPDATE product
        SET amount = $1
        WHERE id = $2 RETURNING *`;

      await connection.query(queryAdjustAmountOldProduct, [
        amountUpdated,
        oldProductId,
      ]);

      // ? Referente a entrada dda quantidade da compra do produto quando ele trocado no update

      const queryAmountNewProductAdjust = `
        SELECT amount
        FROM product
        WHERE id = $1`;

      const amountNewProduct = await connection.query(
        queryAmountNewProductAdjust,
        [fkProductId]
      );

      if (amountNewProduct.rows.length === 0) {
        throw new Error("New product not found.");
      }

      const newAmountProduct = amountNewProduct.rows[0].amount + quantityItem;

      const queryUpdateAmountNewProduct = `
        UPDATE product
        SET amount = $1
        WHERE id = $2`;

      await connection.query(queryUpdateAmountNewProduct, [
        newAmountProduct,
        fkProductId,
      ]);

      // constrói consulta SQL de atualização do pedido
      const queryNewAmountPoduct = `
        UPDATE purchase_item
        SET ${fieldsTitles}
        WHERE ${fkProductIdQuery}
        AND ${fkPurchaseQuery}`;

      const itemPurchaseUpdated = await connection.query(
        queryNewAmountPoduct,
        updateValues
      );

      return itemPurchaseUpdated.rowCount;
    } catch (error) {
      console.error("Error updating item purchase:", error);
      throw new Error("An error ocurred while updating item purchase.");
    }
  }

  async destroy(purchaseId, itemId) {
    try {
      const queryDestroy = `
        DELETE FROM purchase_item
        WHERE fk_purchase_id = $1 AND id = $2`;
      const purchaseItemDestoyed = connection.query(queryDestroy, [
        purchaseId,
        itemId,
      ]);

      return purchaseItemDestoyed;
    } catch (error) {
      console.error(error);
      throw new Error("An error ocurred while deleting item purchase");
    }
  }
}

export default new ItemPurchaseModels();
