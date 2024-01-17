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

  // async show(req, res) {}

  // async create(req, res) {}

  // async update(req, res) {}

  // async destroy(req, res) {}
}

export default new ItemsPurchaseController();
