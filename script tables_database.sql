-- Tabela para armazenar informações de clientes
CREATE TABLE customer (
  -- Identificador único do cliente
  id SERIAL PRIMARY KEY,
  -- Nome do cliente
  name VARCHAR(255) NOT NULL,
  -- Endereço de e-mail do cliente (único)
  email VARCHAR(100) UNIQUE,
  -- Cidade do cliente
  city VARCHAR(100)
);

-- Índices para consultas rápidas
CREATE INDEX idx_customer_name ON customer (name);
CREATE INDEX idx_customer_city ON customer (city);

-- Restrição para garantir que o e-mail do cliente é exclusivo
ALTER TABLE customer
ADD CONSTRAINT uc_customer_email UNIQUE (email);

-- Comentários para documentar a tabela e colunas
COMMENT ON TABLE customer IS 'Tabela para armazenar informações de clientes';
COMMENT ON COLUMN customer.name IS 'Nome do cliente';
COMMENT ON COLUMN customer.email IS 'Endereço de e-mail do cliente (único)';
COMMENT ON COLUMN customer.city IS 'Cidade do cliente';

------------------------------------------------------------------------------------------------------------------------------------------------

-- Tabela para armazenar informações de fornecedores
CREATE TABLE supplier (
  -- Identificador único do fornecedor
  id SERIAL PRIMARY KEY,
  -- Nome do fornecedor (não pode ser nulo)
  name VARCHAR(255) NOT NULL,
  -- Endereço de e-mail do fornecedor (não pode ser nulo)
  email VARCHAR(100) NOT NULL
);

-- Índice para consulta rápida por nome de fornecedor
CREATE INDEX idx_supplier_name ON supplier (name);

-- Índice para consulta rápida por e-mail de fornecedor
CREATE INDEX idx_supplier_email ON supplier (email);

-- Restrição para garantir que o e-mail do fornecedor é exclusivo
ALTER TABLE supplier
ADD CONSTRAINT uc_supplier_email UNIQUE (email);

-- Comentários para documentar a tabela e colunas
COMMENT ON TABLE supplier IS 'Tabela para armazenar informações de fornecedores';
COMMENT ON COLUMN supplier.name IS 'Nome do fornecedor';
COMMENT ON COLUMN supplier.email IS 'Endereço de e-mail do fornecedor (único)';

------------------------------------------------------------------------------------------------------------------------------------------------

-- Tabela para armazenar informações de vendedores
CREATE TABLE seller (
  -- Identificador único do vendedor
  id SERIAL PRIMARY KEY,
  -- Nome do vendedor (não pode ser nulo)
  name VARCHAR(255) NOT NULL,
  -- Endereço de e-mail do vendedor (não pode ser nulo)
  email VARCHAR(100) NOT NULL,
  -- Filial associada ao vendedor (não pode ser nulo)
  branch VARCHAR(100) NOT NULL
);

-- Índice para consulta rápida por nome de vendedor
CREATE INDEX idx_seller_name ON seller (name);

-- Índice para consulta rápida por e-mail de vendedor
CREATE INDEX idx_seller_email ON seller (email);

-- Restrição para garantir que o e-mail do vendedor é exclusivo
ALTER TABLE seller
ADD CONSTRAINT uc_seller_email UNIQUE (email);

-- Comentários para documentar a tabela e colunas
COMMENT ON TABLE seller IS 'Tabela para armazenar informações de vendedores';
COMMENT ON COLUMN seller.name IS 'Nome do vendedor';
COMMENT ON COLUMN seller.email IS 'Endereço de e-mail do vendedor (único)';
COMMENT ON COLUMN seller.branch IS 'Filial associada ao vendedor';

------------------------------------------------------------------------------------------------------------------------------------------------

-- Tabela para armazenar categorias de produtos
CREATE TABLE product_category (
  -- Identificador único da categoria
  id SERIAL PRIMARY KEY,
  -- Descrição da categoria (não pode ser nula)
  description VARCHAR(255) NOT NULL
);

-- Índice para consulta rápida por descrição da categoria
CREATE INDEX idx_product_category_description ON product_category (description);

-- Restrição de unicidade para a descrição da categoria
ALTER TABLE product_category
ADD CONSTRAINT uc_product_category_description UNIQUE (description);

-- Comentários para documentar a tabela e coluna
COMMENT ON TABLE product_category IS 'Tabela para armazenar categorias de produtos';
COMMENT ON COLUMN product_category.description IS 'Descrição da categoria (única)';

------------------------------------------------------------------------------------------------------------------------------------------------

-- Tabela para armazenar unidades de produto
CREATE TABLE product_unit (
  -- Identificador único da unidade
  id SERIAL PRIMARY KEY,
  -- Descrição da unidade (tamanho limitado a 3 caracteres, não pode ser nula)
  description VARCHAR(3) NOT NULL
);

-- Índice para consulta rápida por descrição da unidade
CREATE INDEX idx_product_unit_description ON product_unit (description);

-- Restrição de unicidade para a descrição da unidade
ALTER TABLE product_unit
ADD CONSTRAINT uc_product_unit_description UNIQUE (description);

-- Comentários para documentar a tabela e coluna
COMMENT ON TABLE product_unit IS 'Tabela para armazenar unidades de produto';
COMMENT ON COLUMN product_unit.description IS 'Descrição da unidade (única, tamanho limitado a 3 caracteres)';


------------------------------------------------------------------------------------------------------------------------------------------------

-- Tabela para armazenar informações de produtos
CREATE TABLE product (
  -- Identificador único do produto
  id SERIAL PRIMARY KEY,
  -- Descrição do produto
  description VARCHAR(255),
  -- Quantidade do produto (não pode ser nula)
  amount INTEGER NOT NULL,
  -- Identificador da unidade do produto (referência à tabela product_unit)
  id_unit INTEGER REFERENCES product_unit(id) NOT NULL,
  -- Identificador da categoria do produto (referência à tabela product_category)
  id_category INTEGER REFERENCES product_category(id) NOT NULL
);

-- Índice para consulta rápida por descrição do produto
CREATE INDEX idx_product_description ON product (description);

-- Comentários para documentar a tabela e colunas
COMMENT ON TABLE product IS 'Tabela para armazenar informações de produtos';
COMMENT ON COLUMN product.description IS 'Descrição do produto';
COMMENT ON COLUMN product.amount IS 'Quantidade do produto';
COMMENT ON COLUMN product.id_unit IS 'Identificador da unidade do produto (referência à tabela product_unit)';
COMMENT ON COLUMN product.id_category IS 'Identificador da categoria do produto (referência à tabela product_category)';


------------------------------------------------------------------------------------------------------------------------------------------------


-- Tabela para armazenar informações de vendas
CREATE TABLE sale (
  -- Identificador único da venda
  id SERIAL PRIMARY KEY,
  -- Número da ordem de venda
  order_number INTEGER NOT NULL,
  -- Observação da ordem de venda
  sale_order_ps VARCHAR(255),
  -- Data da ordem
  order_date TIMESTAMP NOT NULL,
  -- Data de liberação
  release_date TIMESTAMP NOT NULL,
  -- Data de expiração
  expiration_date TIMESTAMP NOT NULL,
  -- Identificador do cliente associado à venda
  fk_customer_id INTEGER REFERENCES customer(id) NOT NULL,
  -- Identificador do vendedor associado à venda
  fk_seller_id INTEGER REFERENCES seller(id) NOT NULL
);

-- Índices para consultas rápidas
CREATE INDEX idx_sale_customer ON sale (fk_customer_id);
CREATE INDEX idx_sale_seller ON sale (fk_seller_id);

-- Restrição para garantir que o número da venda é único para cada cliente
ALTER TABLE sale
ADD CONSTRAINT uc_sale_order_customer UNIQUE (order_number, fk_customer_id);

-- Comentários para documentar a tabela e colunas
COMMENT ON TABLE sale IS 'Tabela para armazenar informações de vendas';
COMMENT ON COLUMN sale.order_number IS 'Número da ordem de venda';
COMMENT ON COLUMN sale.sale_order_ps IS 'Observação da ordem de venda';
COMMENT ON COLUMN sale.order_date IS 'Data da ordem';
COMMENT ON COLUMN sale.release_date IS 'Data de liberação';
COMMENT ON COLUMN sale.expiration_date IS 'Data de expiração';
COMMENT ON COLUMN sale.fk_customer_id IS 'Identificador do cliente associado à venda (referência à tabela customer)';
COMMENT ON COLUMN sale.fk_seller_id IS 'Identificador do vendedor associado à venda (referência à tabela seller)';



------------------------------------------------------------------------------------------------------------------------------------------------

CREATE TABLE item_venda (
	id SERIAL PRIMARY KEY,
	quantidade INTEGER NOT NULL,
	valor_unit DECIMAL NOT NULL,
	valor_total DECIMAL NOT NULL,
	id_venda INTEGER REFERENCES venda(id) NOT NULL,
	id_produto INTEGER REFERENCES produto(id) NOT NULL
);
