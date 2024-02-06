import express from "express";
import cors from "cors"; // Importe o pacote 'cors'
import routes from "./routes";
// app.js
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(
      cors({
        origin: "*", // ou especifique a origem do seu aplicativo
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true, // permite credenciais como cookies
      })
    );
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
