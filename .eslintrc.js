module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error", // o prettier é tratado como erro dentro das configurações.
    "class-method-use-this": "off", // isso significa que não precisamos usar o this, nos metodos de classe.
    //! "no-param-reassign": "off", //principalmente quando se usa o ORM sequelize, para sobrescrever os parametros de função. - não estou usando sequelize
    //! "camelcase":"off", //em vez de escrever a variavel como minhaVariavel, pode-se tbm usar minha_variavel, também com uso pratico o sequelize - não estou usando sequelize
    "no-unused-vars": ["error", { argsIgnorePattern: "next" }], // opção para não der erro quando não for declarado uma variavel, nesse caso para a propria variavel next que é do express e usada nos middlewares.
  },
};
