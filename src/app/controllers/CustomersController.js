import customersModel from "../models/CustomerModels";

class CustomerController {
  // Listagem dos Customers
  async index(req, res) {
    const customers = await customersModel.index();
    return res.status(200).json(customers);
  }

  // Recupera um Customer
  async show(req, res) {
    const { id } = req.params;
    const customer = await customersModel.show(id);
    return res.status(200).json(customer);
  }

  // Cria um novo Customer
  create(req, res) {}

  // Atualiza um Customer
  update(req, res) {}

  // Exclui um Customer
  destroy(req, res) {}
}

export default new CustomerController();
