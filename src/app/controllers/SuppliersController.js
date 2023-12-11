import supplierModels from "../models/Supplier";

class SuppliersController {
  async index(req, res) {
    try {
      const suppliers = await supplierModels.index();
      return res.status(200).json(suppliers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const supplier = await supplierModels.show(id);
      return res.status(200).json(supplier);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      await supplierModels.create(body);
      return res.status(201).json({ criado: req.body.name });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      await supplierModels.update(id, body);
      return res.status(200).json({ id_supplier: id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await supplierModels.destroy(id);
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }
}

export default new SuppliersController();
