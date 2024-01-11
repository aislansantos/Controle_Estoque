import purchaseModels from "../../models/movements/Puchase";

class PuchaseController {
  async index(req, res) {
    try {
      const purchases = await purchaseModels.index();
      return res.status(200).json(purchases);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const purchase = await purchaseModels.show(id);

      return res.status(200).json(purchase);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  //   async create(req, res) {}

  //   async update(req, res) {}

  //   async destroy(req, res) {}
}

export default new PuchaseController();
