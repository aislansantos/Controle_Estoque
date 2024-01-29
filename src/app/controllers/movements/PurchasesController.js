import purchaseModels from '../../models/movements/Puchase';

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

  async create(req, res) {
    try {
      const { body } = req;
      await purchaseModels.create(body);
      return res.status(201).json({ criado: body.orderNumber });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      // console.log(id);
      // console.log(body);

      const purchaseUpdate = await purchaseModels.update(id, body);
      return res.status(200).json({ purchaseUpdate, id_purchase: id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await purchaseModels.destroy(id);
      return res.status(204).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new PuchaseController();
