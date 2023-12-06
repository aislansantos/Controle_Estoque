import { Router } from "express";
import bodyParser from "body-parser";
import customers from "./app/controllers/CustomersController";

const jsonParser = bodyParser.json();

const routes = new Router();

// Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", jsonParser, customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

export default routes;
