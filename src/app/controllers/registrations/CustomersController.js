// import CustomerService from "../../models/registrations/Customer";
import customerService from "../../services/resgistration/CustomersService";

class CustomersController {
  async index(req, res) {
    try {
      const customers = await customerService.index();
      return res.status(200).json(customers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const customer = await customerService.show(id);

      if (customer) {
        return res.status(200).json({ data: customer });
      }

      return res
        .status(404)
        .json({ status: "error", message: "Customer not found." });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "error", message: "Internal server error." });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      console.log(body.name);
      await customerService.create(body);
      return res.status(201).json({ data: body });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedCustomer = await customerService.update(id, body);

      if (updatedCustomer) {
        return res.status(200).json({ data: updatedCustomer });
      }
      return res.status(404).json({ message: "Customer not found." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const destroiedCustomer = await customerService.destroy(id);

      // Se o cliente foi deletado com sucesso, retorne os dados do cliente
      if (destroiedCustomer) {
        return res.status(200).json({ data: destroiedCustomer });
      }
      // Se o cliente não foi encontrado
      return res.status(404).json({ message: "Customer not found." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new CustomersController();
