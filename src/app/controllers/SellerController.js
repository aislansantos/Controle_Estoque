import sellerModels from "../models/SellerModels";

class SellerController {
  async index(req, res) {
    const sellers = await sellerModels.index();
    return res.status(200).json(sellers);
  }

  async show(req, res) {
    const { id } = req.params;
    const seller = await sellerModels.show(id);
    return res.status(200).json(seller);
  }

  async create(req, res) {
    const { body } = req;
    await sellerModels.create(body);
    return res.status(201).json({ criado: body.name });
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    await sellerModels.update(id, body);
    return res.status(200).json({ id_seller: id });
  }

  async destroy(req, res) {
    const { id } = req.params;
    await sellerModels.destroy(id);
    res.status(204).json();
  }
}
export default new SellerController();
