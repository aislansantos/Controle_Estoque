# Controle Estoque

Sistema de controle de estoque, para aprofundamento no NodeJS, usando o conceitos de API REST.
Ferramentas usadas para este projeto:

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

* EsLint - Padronização sintaxe e formatação dos códigos(instruções abaixo);
* Prettier -

Dessa forma informando pro nodemon rodar o sucrase e reconhecer o modelo de import/export;

#### Padrionização

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
* Prittier - ;
* EditorConfig - Precisamo ir nas configurações do VS code para configurarmos alguns parametros para o EsLint funcionar corretamente:
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

~~~ Json
  rules: {
    "class-method-use-this": "off", //isso significa que não precisamos usar o this, nos metodos de classe.
    "no-param-reassign": "off", //principalmente quando se usa o ORM sequelize, para sobrescrever os parametros de função.
    "camelcase":"off", //em vez de escrever a variavel como minhaVariavel, pode-se tbm usar minha_variavel, também com uso pratico o sequelize
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }], // opção para não der erro quando não for declarado uma variavel, nesse caso para a propria variavel next que é do express e usada nos middlewares.
    
  },
~~~
