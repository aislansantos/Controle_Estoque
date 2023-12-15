# Controle Estoque

Bem-vindo à API de Controle de Estoque! Esta API foi desenvolvida para gerenciar eficientemente o estoque de produtos, fornecendo operações de registro, detalhes sobre clientes, fornecedores, vendedores e muito mais.

## Tabela de Conteúdo

1. [Introdução e Propósito](#introdução-e-propósito)
2. [Ferramentas e Configurações Iniciais](#ferramentas-e-configurações-iniciais)
3. [Padrões e Configurações](#padrões-e-configurações)
4. [Configurações do VSCode](#configurações-vscode)
5. [Endpoints](#endpoints)
    - [Operações de Registro](#operações-de-registro)
        - [Clientes](#clientes)
        - [Fornecedores](#fornecedores)
        - [Vendedores](#vendedores)
        - [Categoria de Produtos](#categoria-de-produtos)
        - [Unidade de Produtos](#unidade-de-produtos)
        - [Produtos](#produtos)
    - [Movimentações](#movimentações)
        - [Vendas](#vendas)
        - [Itens de Vendas](#itens-de-vendas)

## Introdução e Propósito

A API de Controle de Estoque tem como objetivo fornecer ferramentas eficientes para o gerenciamento de estoque, oferecendo operações de registro para clientes, fornecedores, vendedores e mais. Esta documentação detalha as ferramentas utilizadas, padrões adotados e endpoints disponíveis.

## Ferramentas e Configurações Iniciais

### NodeJS, Express, Yarn, Postgres, Nodemon, Sucrase, etc

- **NodeJS**
- **Express:** MiniFramework/Lib usado para a criação de API com o NodeJS.
- **Yarn:** Gestor de pacotes, utilizado em vez do npm neste projeto.
- **Postgres:** Banco de dados open source.
- **Nodemon:** **Dependência de desenvolvimento** para reconhecer atualizações no projeto.
- **Sucrase:** **Dependência de desenvolvimento** utilizado para modernização dos imports/exports do NodeJS, seguindo o padrão "React".

**Configuração do Nodemon (nodemon.json):**

```json
{
  "execMap": {
    "js": "sucrase-node"
  }
}
```

Dessa forma informando pro nodemon rodar o sucrase e reconhecer o modelo de import/export;

## Padrões e Configurações

- Objetivo: Unificar a sintaxe e formatação do código para garantir consistência entre os desenvolvedores.

### Padrionização

- **Ferramentas Utilizadas:**
  1. **EsLint:**
     - **Função:** Padronização de sintaxe e formatação dos códigos.
     - **Configuração:** Inicializada com o comando `yarn eslint --init`, seguindo as orientações fornecidas. O estilo de código adotado é baseado no guia do Airbnb.
     - **Ajustes:** Algumas regras específicas foram desativadas ou ajustadas, como `class-method-use-this`, `no-unused-vars` (com uma exceção para `next`).

  2. **Prettier:**
     - **Função:** Embelezador do código, melhorando a visualização.
     - **Instalação:** Realizada com o comando `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`.
     - **Integração:** Configurado para trabalhar em conjunto com o EsLint, evitando conflitos com o estilo do Airbnb.

  3. **EditorConfig:**
     - **Função:** Padronização de arquivos, especialmente útil em ambientes com múltiplos editores de texto.
     - **Integração:** Um arquivo `.editorconfig` foi gerado automaticamente e ajustado para as necessidades do projeto.

### Configurações VsCode

- EsLint - (**dependencia de desenvolvimento**) depois de instalado deve se:
  - executar o comando: yarn eslint --init - para iniciar a configuração, ele vai fazer uma serie de pergunta sobre como será a sintaxe e uso, no caso desse projetos vamos configurar da seguinte forma:
    - **To check syntax, find problems, and enforce code style** - basicamente aqui le vai achar problemas de códigos e vai forçar o ajuste conforme as configurações;
    - **JavaScript modules (import/export)** - vamos usar essa opção por conta do uso do sucrase-node que permite o uso desse tipo de configuração conforme ajuste, **sem o sucrase ou o babel temos de usar o formato ComonJS(require/export)**;
    - **None of these** - pois não será ultilizado nem Vue.js, nem o React.
    - **Does your project use TypeScript - NO** - vamos ultilizar o **NO**, pois estamos desenvolvento em JS sem os types;
    - **Where does your code run - Node** - vamos desmarcar a opção Browser e marcar a opção Node, usando os direcionais para selecionar e a barra de espaço para marcar/desmarcar;
    - **How would you like to define a style for your project? - Use a popular style guide** - vamos ultilizar um formato de stilo de codigo popular neste projeto;
    - **Which style guide do you want to follow? - Airbnb: `https://github.com/airbnb/javascript`** - nesse caso estamos usando o modelo do Airbnb;
    - **What format do you want your config file to be in?** - Escolhemos qual o formato que vamos exporta esse nosso arquivo de configuração, nesse caso escolheremos o JavaScript.
    - **Would you like to install them now?** ele pergunta se vamos rodar a instalação, colocamos **Yes**;
    - **Which package manager do you want to use?** - pergunta qual o gestor de pacote estamos usando, nesse caso selecionamos o **yarn**.
      - Depois disso ele faz a instalação e cria o arquivo de configuração .eslintrc.js, uma observação se rodar o npn estiver usando o yarn apagar o arquivo package-lok.json e rodar o comando **yarn** para atualizar os pacotes no arquivo yarn.lock.
    - Na sequencia vamos instalar a extensão EsLint no Visual Code, o EsLint vai trabalhar junto ao VS Code para fazer as devidas correções nos códigos, no momento que salvar o arquivos.

- Prittier - (**dependencia de desenvolvimento**) É uma ferramenta que vai garantir o embelezamento do código, a instalação se faz da seguinte forma:
  - yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
  - Voltamos no .eslintrc.js para fazer alguns ajustes, para arrumar alguns conflitos com o style do **Airbnb**, que selecionamos na instalação e configuração do EsLint:

  ~~~ JavaScript
    extends: ['airbnb-base', "prettier"], // Criamos um array onde antes só havia o airbnb-base e colocamos o "prettier" no mesmo
    plugins: ["prettier"], // criamos a seguinte chaven dentro do arquivo
  ~~~

  - Tem de ser ciardo o prettier dentro da raiz do programa um arquivo chamado .prettierrc, que é o arquivo de configuração do prettier vamos deixar o arquivo da seguinte forma:

 ~~~ JavaScript
  {
    "singleQuote": false,
    "trailingComma": "es5"
  }
~~~

- Configurações VsCode - Precisamo ir nas configurações do VS code para configurarmos alguns parametros para o EsLint funcionar corretamente:
  - Para abrir as configurações pode usar contol + (,) virgúla, ou command + (,) virgúla, dependendo do sistema ou mesmo pela engrenagem no lado inferior esquerdo e depois na opção settings;
    - Vamos editar o arquivo de Json para configurar o VS Code:

    ~~~ Json
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
    },
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact"
    ],
    ~~~

- Dentro do arquivo arquivo do .eslintrc.js, temos de reescrever algumas regras no campo rules devemos deixar da seguinte forma:

~~~ javaScript
  rules: {
    "class-method-use-this": "off", //isso significa que não precisamos usar o this, nos metodos de classe.
    // "no-param-reassign": "off", //principalmente quando se usa o ORM sequelize, para sobrescrever os parametros de função.
    //! "camelcase":"off", //em vez de escrever a variavel como minhaVariavel, pode-se tbm usar minha_variavel, também com uso pratico o sequelize
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }], // opção para não der erro quando não for declarado uma variavel, nesse caso para a propria variavel next que é do express e usada nos middlewares.

  },
~~~

>Depois termido a configuração podemos rodar o processo de fix para pasta inteira do projeto, usando o comando: yarn eslint --fix "pasta_que_quer_verificar" --ext .js, lembrando que estou usando o yarn ao invés do np,
Exemplo no meu caso na pasta src: yarn eslint --fix src --ext .js

*Obs: Cuidado para não rodar o comando na pasta node_module!*

- EditorConfig - Vamos instalar a extensão, depois de instalado, na area aonde fica os arquivos, clicar  com o botão direito e clicar na opção generate .editoconfig, deesa forma ele ja vai inicializar por padrão com algumas configurações, ajustar o arquivo para as seguintes configurações:

~~~ editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
trim_trailing_whitespace=true
insert_final_newline = true
~~~

### Conclusão

Essas ferramentas e configurações proporcionam um ambiente de desenvolvimento consistente e ajudam a manter um código limpo e bem formatado. A integração do EsLint com o VSCode, juntamente com o uso do Prettier, contribui para uma experiência de codificação mais eficiente e livre de erros de estilo. O EditorConfig ajuda a manter a consistência entre diferentes editores de texto no projeto.

## Endpoints

### Operações de Registro

Antes de explorar os endpoints detalhadamente, é importante compreender o que significam as "Operações de Registro". Essas operações incluem interações com clientes, fornecedores, vendedores, etc.

#### Clientes

- **Obter Todos os Clientes** - `GET host/customers/:id`
- **Obter Cliente por ID** - `GET host/customers/:id`
- **Criar Novo Cliente** - `POST host/customers`
- **Atualizar Cliente por ID** - `PUT host/customers/:id`
- **Excluir Cliente por ID** - `DELETE host/customers/:id`

#### Fornecedores

- **Obter Todos os Fornecedores** - `GET host/suppliers`
- **Obter Fornecedor por ID** - `GET host/suppliers/:id`
- **Adicionar Novo Fornecedor** - `POST host/suppliers`
- **Atualizar Fornecedor por ID** - `PUT host/suppliers/:id`
- **Remover Fornecedor por ID** - `DELETE host/suppliers/:id`

#### Vendedores

- **Obter Todos os Vendedores** - `GET host/sellers`
- **Obter Vendedor por ID** - `GET host/sellers/:id`
- **Adicionar Novo Vendedor** - `POST host/sellers`
- **Atualizar Vendedor por ID** - `PUT host/sellers/:id`
- **Remover Vendedor por ID** - `DELETE host/sellers/:id`

#### Categoria de Produtos

- **Obter Todas as Categorias de Produtos** - `GET host/products/categories`
- **Obter Categoria de Produto por ID** - `GET host/products/categories/:id`
- **Adicionar Nova Categoria de Produto** - `POST host/products/categories`
- **Atualizar Categoria de Produto por ID** - `PUT host/products/categories/:id`
- **Remover Categoria de Produto por ID** - `DELETE host/products/categories/:id`

#### Unidade de Produtos

- **Obter Todas as Unidades de Produtos** - `GET host/products/units`
- **Obter Unidade de Produto por ID** - `GET host/products/units/:id`
- **Adicionar Nova Unidade de Produto** - `POST host/products/units`
- **Atualizar Unidade de Produto por ID** - `PUT host/products/units/:id`
- **Remover Unidade de Produto por ID** - `DELETE host/products/units/:id`

#### Produtos

- **Obter Todos os Produtos** - `GET host/products`
- **Obter Produto por ID** - `GET host/products/:id`
- **Adicionar Novo Produto** - `POST host/products`
- **Atualizar Produto por ID** - `PUT host/products/:id`
- **Remover Produto por ID** - `DELETE host/products/:id`

### Movimentações

#### Vendas

- **Obter Todas as Vendas** - `GET host/sales`
- **Obter Venda por ID** - `GET host/sales/:id`
- **Registrar Nova Venda** - `POST host/sales`
- **Atualizar Venda por ID** - `PATCH host/sales/:id`
- **Cancelar Venda por ID** - `DELETE host/sales/:id`

#### Itens de Vendas

- **Obter Todos os Itens de Venda de uma Venda** - `GET host/sales/:salesId/items_sales`
- **Obter Item de Venda por ID** - `GET host/sales/:salesId/items_sales/:id`
- **Adicionar Novo Item de Venda** - `POST host/sales/:salesId/items_sales`
- **Atualizar Item de Venda por ID** - `PATCH host/sales/:salesId/items_sales/:id`
- **Remover Item de Venda por ID** - `DELETE host/sales/:salesId/items_sales/:id`
