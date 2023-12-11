import salesModels from "../../models/movements/Sale";

class SaleController {
  async index(req, res) {
    try {
      const sales = await salesModels.index();
      return res.status(200).json(sales);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const sale = await salesModels.show(id);
      return res.status(200).json(sale);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      await salesModels.create(body);
      return res.status(201).json({ criado: body.orderNumber });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      const saleUpdated = await salesModels.update(id, body);
      return res.status(200).json({ saleUpdated, id_sale: id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await salesModels.destroy(id);
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new SaleController();
