import express, { Router } from "express";
import customers from "./app/controllers/registrations/CustomersController";
import suppliersController from "./app/controllers/registrations/SuppliersController";
import sellers from "./app/controllers/registrations/SellersController";
import productCategoriesController from "./app/controllers/registrations/ProductCategoriesController";
import productUnitsController from "./app/controllers/registrations/ProductUnitsController";
import productsController from "./app/controllers/registrations/ProductsController";
import saleController from "./app/controllers/movements/SalesController";
import itemsSaleController from "./app/controllers/movements/ItensSalesController";
import purchasesController from "./app/controllers/movements/PurchasesController";
import itemsPurchaseController from "./app/controllers/movements/itemsPurchaseController";

const routes = Router();

// Aplicar express.json() diretamente ao roteador
// routes.use(express.json());

// Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", express.json(), customers.create);
routes.patch("/customers/:id", express.json(), customers.update);
routes.delete("/customers/:id", customers.destroy);

// Suppliers
routes.get("/suppliers", suppliersController.index);
routes.get("/suppliers/:id", suppliersController.show);
routes.post("/suppliers", express.json(), suppliersController.create);
routes.patch("/suppliers/:id", express.json(), suppliersController.update);
routes.delete("/suppliers/:id", suppliersController.destroy);

// Sellers
routes.get("/sellers", sellers.index);
routes.get("/sellers/:id", sellers.show);
routes.post("/sellers", express.json(), sellers.create);
routes.patch("/sellers/:id", express.json(), sellers.update);
routes.delete("/sellers/:id", sellers.destroy);

// Categories of Products
routes.get("/products/categories", productCategoriesController.index);
routes.get("/products/categories/:id", productCategoriesController.show);
routes.post(
  "/products/categories",
  express.json(),
  productCategoriesController.create
);
routes.put(
  "/products/categories/:id",
  express.json(),
  productCategoriesController.update
);
routes.delete("/products/categories/:id", productCategoriesController.destroy);

// Units of Products
routes.get("/products/units", productUnitsController.index);
routes.get("/products/units/:id", productUnitsController.show);
routes.post("/products/units", express.json(), productUnitsController.create);
routes.put(
  "/products/units/:id",
  express.json(),
  productUnitsController.update
);
routes.delete("/products/units/:id", productUnitsController.destroy);

// Products
routes.get("/products", productsController.index);
routes.get("/products/:id", productsController.show);
routes.post("/products", express.json(), productsController.create);
routes.put("/products/:id", express.json(), productsController.update);
routes.delete("/products/:id", productsController.destroy);

// Sale
routes.get("/sales", saleController.index);
routes.get("/sales/:id", saleController.show);
routes.post("/sales", express.json(), saleController.create);
routes.patch("/sales/:id", express.json(), saleController.update);
routes.delete("/sales/:id", saleController.destroy);

// Items Sales
//! buscas de id de produto na venda pelo: id_product_sale
routes.get("/sales/:salesId/items_sales", itemsSaleController.index);
routes.get("/sales/:salesId/items_sales/:id", itemsSaleController.show);
routes.post(
  "/sales/:salesId/items_sales",
  express.json(),
  itemsSaleController.create
);
routes.patch(
  "/sales/:salesId/items_sales/:id",
  express.json(),
  itemsSaleController.update
);
routes.delete("/sales/:salesId/items_sales/:id", itemsSaleController.destroy);

// Purchase
routes.get("/purchases/", purchasesController.index);
routes.get("/purchases/:id", purchasesController.show);
routes.post("/purchases", express.json(), purchasesController.create);
routes.put("/purchases/:id", express.json(), purchasesController.update);
routes.delete("/purchases/:id", purchasesController.destroy);

// Items Purchase
routes.get(
  "/purchases/:purchaseId/itemsPurchase",
  itemsPurchaseController.index
);
routes.get(
  "/purchases/:purchaseId/itemsPurchase/:id",
  itemsPurchaseController.show
);
routes.post(
  "/purchases/:purchaseId/itemsPurchase",
  express.json(),
  itemsPurchaseController.create
);
routes.patch(
  "/purchases/:purchaseId/itemsPurchase/:id",
  express.json(),
  itemsPurchaseController.update
);
routes.delete(
  "/purchases/:purchaseId/itemsPurchase/:id",
  itemsPurchaseController.destroy
);

export default routes;
