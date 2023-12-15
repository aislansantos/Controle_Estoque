// import CustomerService from "../../models/registrations/Customer";
import customerService from "../../services/resgistration/CustomerService";

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

      if (customer !== null) {
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
      await customerService.update(id, body);
      return res.status(200).json({ id_client: id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await customerService.destroy(id);
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new CustomersController();
