import itemsSaleModels from "../../models/movements/ItemsSale";

class ItensSalesController {
  async index(req, res) {
    try {
      const { salesId } = req.params;
      console.log(salesId);
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
      const { body } = req;
      await itemsSaleModels.create(body);

      return res.status(201).json({ criado: body });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {}

  async destroy(req, res) {}
}

export default new ItensSalesController();