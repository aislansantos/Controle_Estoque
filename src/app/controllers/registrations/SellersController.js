import sellerModels from "../../models/registrations/Seller";

class SellersController {
  async index(req, res) {
    try {
      const sellers = await sellerModels.index();
      return res.status(200).json(sellers);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const seller = await sellerModels.show(id);
      return res.status(200).json(seller);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      await sellerModels.create(body);
      return res.status(201).json({ criado: body.name });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      await sellerModels.update(id, body);
      return res.status(200).json({ id_seller: id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await sellerModels.destroy(id);
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default new SellersController();
