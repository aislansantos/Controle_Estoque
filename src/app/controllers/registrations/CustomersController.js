import customersModel from "../../models/registrations/Customer";

class CustomersController {
  async index(req, res) {
    try {
      const customers = await customersModel.index();
      return res.status(200).json(customers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const customer = await customersModel.show(id);
      return res.status(200).json(customer);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      await customersModel.create(body);
      return res.status(201).json({ criado: body.name });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      await customersModel.update(id, body);
      return res.status(200).json({ id_client: id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await customersModel.destroy(id);
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new CustomersController();
