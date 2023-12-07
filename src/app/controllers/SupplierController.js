import supplierModels from "../models/SupplierModels";

class SupplierController {
  async index(req, res) {
    const suppliers = await supplierModels.index();
    return res.status(200).json(suppliers);
  }

  async show(req, res) {
    const { id } = req.params;
    const supplier = await supplierModels.show(id);
    return res.status(200).json(supplier);
  }

  async create(req, res) {
    const { body } = req;
    await supplierModels.create(body);
    return res.status(201).json({ criado: req.body.name });
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    await supplierModels.update(id, body);
    return res.status(200).json({ id_supplier: id });
  }

  async destroy(req, res) {
    const { id } = req.params;
    await supplierModels.destroy(id);
    return res.status(204).json();
  }
}

export default new SupplierController();
