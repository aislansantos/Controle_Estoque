// import CustomerService from "../../models/registrations/Customer";
import customerService from "../../services/resgistration/CustomersService";

const messages = {
  internalServerError: "Internal server error",
  customerNotFound: "Customer not found.",
};

class CustomersController {
  async index(req, res) {
    try {
      const customers = await customerService.index();
      return res.status(200).json(customers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: messages.internalServerError });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const customer = await customerService.show(id);

      if (Array.isArray(customer) && customer.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: messages.customerNotFound });
      }

      return res.status(200).json({ data: customer });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ status: "error", message: messages.internalServerError });
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
      return res.status(500).json({ message: messages.internalServerError });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const updatedCustomer = await customerService.update(id, body);

      if (Array.isArray(updatedCustomer) && updatedCustomer.length === 0) {
        return res.status(404).json({ message: messages.customerNotFound });
      }

      return res.status(200).json({ data: updatedCustomer });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: messages.internalServerError });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const destroyedCustomer = await customerService.destroy(id);

      // Se o cliente foi deletado com sucesso, retorne os dados do cliente
      if (Array.isArray(destroyedCustomer) && destroyedCustomer.length === 0) {
        return res.status(404).json({ message: messages.customerNotFound });
      }

      return res.status(200).json({ data: destroyedCustomer });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: messages.internalServerError });
    }
  }
}

export default new CustomersController();
