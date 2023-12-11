import productUnitModels from "../../models/registrations/ProductUnit";

class ProductUnitsController {
  async index(req, res) {
    try {
      const productUnits = await productUnitModels.index();
      return res.status(200).json(productUnits);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const productUnit = await productUnitModels.show(id);
      return res.status(200).json(productUnit);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      await productUnitModels.create(body);
      return res.status(201).json({ criado: body.description });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      await productUnitModels.update(id, body);
      return res.status(200).json({ id_categoria: id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await productUnitModels.destroy(id);
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ProductUnitsController();
