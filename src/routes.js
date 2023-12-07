import { Router } from "express";
import bodyParser from "body-parser"; //! usado como middleware para ajuste do req.body undefined
import customers from "./app/controllers/CustomersController";
import suppliers from "./app/controllers/SupplierController";

const routes = new Router();
const jsonParser = bodyParser.json();

// Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", jsonParser, customers.create);
routes.put("/customers/:id", jsonParser, customers.update);
routes.delete("/customers/:id", customers.destroy);

// Suppliers
routes.get("/suppliers", suppliers.index);
routes.get("/suppliers/:id", suppliers.show);
routes.post("/suppliers", jsonParser, suppliers.create);
routes.put("/suppliers/:id", jsonParser, suppliers.update);
routes.delete("/suppliers/:id", suppliers.destroy);

export default routes;
