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
        * Depois disso ele faz a instalação e cria o arquivo de configuração .eslintrc.js
* Prittier - ;
* EditorConfig - ;
