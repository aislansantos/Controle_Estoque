import itemsPurchaseModels from "../../models/movements/ItemsPurchase";

class ItemsPurchaseController {
  async index(req, res) {
    try {
      const { purchaseId } = req.params;
      const itemsPuchase = await itemsPurchaseModels.index(purchaseId);
      return res.status(200).json(itemsPuchase);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const { purchaseId, id } = req.params;
      const itemPurchase = await itemsPurchaseModels.show(purchaseId, id);

      return res.status(200).json(itemPurchase);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server " });
    }
  }

  async create(req, res) {
    try {
      const { purchaseId } = req.params;
      const { body } = req;

      await itemsPurchaseModels.create(purchaseId, body);

      return res.status(200).json({ criado: body });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // async update(req, res) {}

  // async destroy(req, res) {}
}

export default new ItemsPurchaseController();
