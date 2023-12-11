CREATE TABLE customer (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(100),
  city VARCHAR(100)
);

CREATE TABLE supplier (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE seller (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  branch VARCHAR(100) NOT NULL,
);

CREATE TABLE product_category (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL
);

CREATE TABLE product_unit (
  id SERIAL PRIMARY KEY,
  description VARCHAR(4) NOT NULL
);

CREATE TABLE product (
	id SERIAL PRIMARY KEY,
	description VARCHAR(255),
	amount INTEGER NOT NULL,
	id_unit INTEGER REFERENCES product_unit(id) NOT NULL,
 	id_category INTEGER REFERENCES product_category(id) NOT NULL
);

CREATE TABLE venda (
	id SERIAL PRIMARY KEY,
	data_pedido TIMESTAMP NOT NULL,
	data_inclusao TIMESTAMP NOT NULL,
	vencimento TIMESTAMP NOT NULL,
	id_cliente INTEGER REFERENCES cliente(id) NOT NULL,
	id_vendedor INTEGER REFERENCES vendedor(id) NOT NULL
);

CREATE TABLE item_venda (
	id SERIAL PRIMARY KEY,
	quantidade INTEGER NOT NULL,
	valor_unit DECIMAL NOT NULL,
	valor_total DECIMAL NOT NULL,
	id_venda INTEGER REFERENCES venda(id) NOT NULL,
	id_produto INTEGER REFERENCES produto(id) NOT NULL
);













