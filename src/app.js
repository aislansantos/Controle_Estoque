import express from "express";
import cors from "cors"; // Importe o pacote 'cors'
import routes from "./routes";

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors()); // Adicione o middleware 'cors'
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
