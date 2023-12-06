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
  async create(req, res) {
    const { body } = req;
    await customersModel.create(body);
    return res.status(201).json({ criado: body.name });
  }

  // Atualiza um Customer
  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    await customersModel.update(id, body);
    return res.status(200).json({ id_client: id });
  }

  // Exclui um Customer
  async destroy(req, res) {
    const { id } = req.params;
    await customersModel.destroy(id);
    return res.status(204).json();
  }
}

export default new CustomerController();
