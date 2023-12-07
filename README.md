# Controle Estoque

Sistema de controle de estoque, para aprofundamento no NodeJS, usando o conceitos de API REST.

## Ferramentas e Confisurações Iniciais

* NodeJS
* Express - MiniFramework/Lib usado para a crição de API com o NodeJS;
* Yarn - gestor de pacotes, ao invés do npmn neste projeto está sendo ultilizado o yarn;
* Postgres - Bando de dados open source;
* Nodemon - (**dependencia de desenvolvimento**) - reconhece atualizações no projeto, derruba e reestarta o server, sem a necessidade de rodar o comando "node nomedoarquivo.js";
* Sucrease - (**dependencia de desenvolvimento**) - ultilizado para modernização dos imports/exports do NodeJS, ultilizando padrão "React", para o uso dele na raiz do projeto temos de criar um arquivo chamado nodemon.json com a seguinte estrurura:

~~~ json
{
  "execMap":{
    "js":"sucrase-node"
  }
}
~~~

Dessa forma informando pro nodemon rodar o sucrase e reconhecer o modelo de import/export;

* EsLint - Padronização sintaxe e formatação dos códigos(instruções abaixo) garantindo o bom funcionamento e as boas praticas de programação;
* Prettier - É um embelezador do código, melhorando a vizualização do código, ex: se vamos usar aspas duplas ou simples.
* EditorConfig - serve para padronizar os arquivos, caso haja multiplos editores de texto dentro do projeto, por exemplo estamos ultilizando o vsCode, outro elemento do projeto usa o Sublime, com isso cada editor pode ter uma configuração diferente, por exemplo um esta usando o tab para espaçamento o e o outro está considerando dois espaços.

### Padrionização

Para a padronização dos códigos unificando as sintaxes e formatação, usa-se este tipo de padronização para quando se for trabalhar em equipe toda estilização do código será igual a todos os desenvolvedores envolvidos e para isso vamos ultilizar 3 ferramentas:

* EsLint - (**dependencia de desenvolvimento**) depois de instalado deve se:
  * executar o comando: yarn eslint --init - para iniciar a configuração, ele vai fazer uma serie de pergunta sobre como será a sintaxe e uso, no caso desse projetos vamos configurar da seguinte forma:
    * **To check syntax, find problems, and enforce code style** - basicamente aqui le vai achar problemas de códigos e vai forçar o ajuste conforme as configurações;
    * **JavaScript modules (import/export)** - vamos usar essa opção por conta do uso do sucrase-node que permite o uso desse tipo de configuração conforme ajuste, **sem o sucrase ou o babel temos de usar o formato ComonJS(require/export)**;
    * **None of these** - pois não será ultilizado nem Vue.js, nem o React.
    * **Does your project use TypeScript - NO** - vamos ultilizar o **NO**, pois estamos desenvolvento em JS sem os types;
    * **Where does your code run - Node** - vamos desmarcar a opção Browser e marcar a opção Node, usando os direcionais para selecionar e a barra de espaço para marcar/desmarcar;
    * **How would you like to define a style for your project? - Use a popular style guide** - vamos ultilizar um formato de stilo de codigo popular neste projeto;
    * **Which style guide do you want to follow? - Airbnb: `https://github.com/airbnb/javascript`** - nesse caso estamos usando o modelo do Airbnb;
    * **What format do you want your config file to be in?** - Escolhemos qual o formato que vamos exporta esse nosso arquivo de configuração, nesse caso escolheremos o JavaScript.
    * **Would you like to install them now?** ele pergunta se vamos rodar a instalação, colocamos **Yes**;
    * **Which package manager do you want to use?** - pergunta qual o gestor de pacote estamos usando, nesse caso selecionamos o **yarn**.
      * Depois disso ele faz a instalação e cria o arquivo de configuração .eslintrc.js, uma observação se rodar o npn estiver usando o yarn apagar o arquivo package-lok.json e rodar o comando **yarn** para atualizar os pacotes no arquivo yarn.lock.
    * Na sequencia vamos instalar a extensão EsLint no Visual Code, o EsLint vai trabalhar junto ao VS Code para fazer as devidas correções nos códigos, no momento que salvar o arquivos.

* Prittier - (**dependencia de desenvolvimento**) É uma ferramenta que vai garantir o embelezamento do código, a instalação se faz da seguinte forma:
  * yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
  * Voltamos no .eslintrc.js para fazer alguns ajustes, para arrumar alguns conflitos com o style do **Airbnb**, que selecionamos na instalação e configuração do EsLint:

  ~~~ JavaScript
    extends: ['airbnb-base', "prettier"], // Criamos um array onde antes só havia o airbnb-base e colocamos o "prettier" no mesmo
    plugins: ["prettier"], // criamos a seguinte chaven dentro do arquivo
  ~~~

  * Tem de ser ciardo o prettier dentro da raiz do programa um arquivo chamado .prettierrc, que é o arquivo de configuração do prettier vamos deixar o arquivo da seguinte forma:

 ~~~ JavaScript
  {
    "singleQuote": false,
    "trailingComma": "es5"
  }
~~~

* Configurações VsCode - Precisamo ir nas configurações do VS code para configurarmos alguns parametros para o EsLint funcionar corretamente:
  * Para abrir as configurações pode usar contol + (,) virgúla, ou command + (,) virgúla, dependendo do sistema ou mesmo pela engrenagem no lado inferior esquerdo e depois na opção settings;
    * Vamos editar o arquivo de Json para configurar o VS Code:

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

* Dentro do arquivo arquivo do .eslintrc.js, temos de reescrever algumas regras no campo rules devemos deixar da seguinte forma:

~~~ javaScript
  rules: {
    "class-method-use-this": "off", //isso significa que não precisamos usar o this, nos metodos de classe.
    // "no-param-reassign": "off", //principalmente quando se usa o ORM sequelize, para sobrescrever os parametros de função.
    //! "camelcase":"off", //em vez de escrever a variavel como minhaVariavel, pode-se tbm usar minha_variavel, também com uso pratico o sequelize
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }], // opção para não der erro quando não for declarado uma variavel, nesse caso para a propria variavel next que é do express e usada nos middlewares.

  },
~~~

>Depois termido a configuração podemos rodar o processo de fix para pasta inteira do projeto, usando o comando: yarn eslint --fix "pasta_que_quer_verificar" --ext .js.

*Obs: Cuidado para não rodar o comando na pasta node_module!*

* EditorConfig - Vamos instalar a extensão, depois de instalado, na area aonde fica os arquivos, clicar  com o botão direito e clicar na opção generate .editoconfig, deesa forma ele ja vai inicializar por padrão com algumas configurações, ajustar o arquivo para as seguintes configurações:

~~~ editorconfig
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
trim_trailing_whitespace=true
insert_final_newline = true
~~~

## Endpoints

Seguindo API-REST para a criaçao desse app RESTFUL. visando a melhor usabilidade do sistema.

### Customers

* Get - host/customers;
* Get - host/customers/:id;
* Post - host/customers;
* Put - host/customers/:id;
* Delete - host/customers/:id;

### Suppliers

* Get - host/suppliers;
* Get - host/suppliers/:id;
* Post - host/suppliers;
* Put - host/suppliers/:id;
* Delete - host/suppliers/:id;

### Sellers

* Get - host/sellers;
* Get - host/sellers/:id;
* Post - host/sellers;
* Put - host/sellers/:id;
* Delete - host/sellers/:id;

### Category of Products

* Get - host/products/categories;
* Get - host/products/categories/:id;
* Post - host/products/categories;
* Put - host/products/categories/:id;
* Delete - host/products/categories/:id;
