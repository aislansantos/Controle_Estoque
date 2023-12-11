import { Router } from "express";
import bodyParser from "body-parser"; //! usado como middleware para ajuste do req.body undefined
import customers from "./app/controllers/registrations/CustomersController";
import suppliers from "./app/controllers/registrations/SuppliersController";
import sellers from "./app/controllers/registrations/SellersController";
import productCategoriesController from "./app/controllers/registrations/ProductCategoriesController";
import productUnitsController from "./app/controllers/registrations/ProductUnitsController";
import productsController from "./app/controllers/registrations/ProductsController";
import saleController from "./app/controllers/movements/SalesController";

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

// Sellers
routes.get("/sellers", sellers.index);
routes.get("/sellers/:id", sellers.show);
routes.post("/sellers", jsonParser, sellers.create);
routes.put("/sellers/:id", jsonParser, sellers.update);
routes.delete("/sellers/:id", sellers.destroy);

// Categories of Products
routes.get("/products/categories", productCategoriesController.index);
routes.get("/products/categories/:id", productCategoriesController.show);
routes.post(
  "/products/categories",
  jsonParser,
  productCategoriesController.create
);
routes.put(
  "/products/categories/:id",
  jsonParser,
  productCategoriesController.update
);
routes.delete("/products/categories/:id", productCategoriesController.destroy);

// Units of Products
routes.get("/products/units", productUnitsController.index);
routes.get("/products/units/:id", productUnitsController.show);
routes.post("/products/units", jsonParser, productUnitsController.create);
routes.put("/products/units/:id", jsonParser, productUnitsController.update);
routes.delete("/products/units/:id", productUnitsController.destroy);

// Products
routes.get("/products", productsController.index);
routes.get("/products/:id", productsController.show);
routes.post("/products", jsonParser, productsController.create);
routes.put("/products/:id", jsonParser, productsController.update);
routes.delete("/products/:id", productsController.destroy);

// Sale
routes.get("/sales", saleController.index);
routes.get("/sales/:id", saleController.show);
routes.post("/sales", jsonParser, saleController.create);
routes.patch("/sales/:id", jsonParser, saleController.update);
routes.delete("/sales/:id", saleController.destroy);

export default routes;
