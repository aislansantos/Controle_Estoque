SELECT * FROM sale_item WHERE fk_sale_id = 1;
SELECT * FROM product;

SELECT *
FROM sale_item si
INNER JOIN product pr ON si.fk_product_id = pr.id
INNER JOIN product_unit pu ON pr.fk_id_unit = pu.id
INNER JOIN product_category pc ON pr.fk_id_category = pc.id
INNER JOIN sale sa ON si.fk_sale_id = sa.id;

SELECT pr.id, pr.description as product, si.quantity_item, si.unitary_value, si.total_value
FROM sale_item si
INNER JOIN product pr ON si.fk_product_id = pr.id
INNER JOIN product_unit pu ON pr.fk_id_unit = pu.id
INNER JOIN product_category pc ON pr.fk_id_category = pc.id
INNER JOIN sale sa ON si.fk_sale_id = sa.id
WHERE si.fk_sale_id = 1;

SELECT id SUM(total_value) as total_pedido FROM sale_item WHERE fk_sale_id = 1;