import SuppliersService from "../../services/resgistration/SuppliersService";

const messages = {
  internalServerError: "Internal server error",
  supplierNotFound: "Supplier not found.",
};

class SuppliersController {
  async index(req, res) {
    try {
      const suppliers = await SuppliersService.index();
      return res.status(200).json(suppliers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: messages.internalServerError });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const supplier = await SuppliersService.show(id);

      if (Array.isArray(supplier) && supplier.length === 0) {
        return res
          .status(404)
          .json({ status: "error", message: messages.supplierNotFound });
      }

      return res.status(200).json(supplier);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: messages.internalServerError });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      await SuppliersService.create(body);
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
      const updatedSupplier = await SuppliersService.update(id, body);

      if (Array.isArray(updatedSupplier) && updatedSupplier.length === 0) {
        return res.status(404).json({ message: messages.supplierNotFound });
      }
      return res.status(200).json({ data: updatedSupplier });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: messages.internalServerError });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const destroyedSupplier = await SuppliersService.destroy(id);

      if (Array.isArray(destroyedSupplier) && destroyedSupplier.length === 0) {
        return res.status(404).json({ message: messages.supplierNotFound });
      }

      return res.status(200).json({ data: destroyedSupplier });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: messages.internalServerError });
    }
  }
}

export default new SuppliersController();
