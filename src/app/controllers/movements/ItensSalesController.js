import itemsSaleModels from "../../models/movements/ItemsSale";

class ItensSalesController {
  async index(req, res) {
    try {
      const { salesId } = req.params;
      const itemsSales = await itemsSaleModels.index(salesId);
      return res.status(200).json(itemsSales);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const { salesId, id } = req.params;
      const itemSales = await itemsSaleModels.show(salesId, id);

      return res.status(200).json(itemSales);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { salesId } = req.params;
      const { body } = req;

      await itemsSaleModels.create(salesId, body);

      return res.status(201).json({ criado: body });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { salesId, id } = req.params;
      const { body } = req;

      await itemsSaleModels.update(body, salesId, id);

      return res.json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { salesId, id } = req.params;

      await itemsSaleModels.destroy(salesId, id);
      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ItensSalesController();
