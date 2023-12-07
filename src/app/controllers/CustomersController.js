import customersModel from "../models/Customer";

class CustomersController {
  async index(req, res) {
    const customers = await customersModel.index();
    return res.status(200).json(customers);
  }

  async show(req, res) {
    const { id } = req.params;
    const customer = await customersModel.show(id);
    return res.status(200).json(customer);
  }

  async create(req, res) {
    const { body } = req;
    await customersModel.create(body);
    return res.status(201).json({ criado: body.name });
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    await customersModel.update(id, body);
    return res.status(200).json({ id_client: id });
  }

  async destroy(req, res) {
    const { id } = req.params;
    await customersModel.destroy(id);
    return res.status(204).json();
  }
}

export default new CustomersController();
