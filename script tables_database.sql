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

CREATE TABLE category (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255) NOT NULL
);

CREATE TABLE unidade (
  id SERIAL PRIMARY KEY,
  descricao VARCHAR(100) NOT NULL
);

CREATE TABLE produto (
	id SERIAL PRIMARY KEY,
	descricao VARCHAR(255),
	estoque INTEGER NOT NULL,
	id_unidade INTEGER REFERENCES unidade(id) NOT NULL,
 	id_categoria INTEGER REFERENCES categoria(id) NOT NULL
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













