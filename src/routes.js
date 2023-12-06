import { Router } from "express";
import bodyParser from "body-parser"; //! usado como middleware para ajuste do req.body undefined
import customers from "./app/controllers/CustomersController";

const routes = new Router();
const jsonParser = bodyParser.json();

// Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", jsonParser, customers.create);
routes.put("/customers/:id", jsonParser, customers.update);
routes.delete("/customers/:id", customers.destroy);

export default routes;
