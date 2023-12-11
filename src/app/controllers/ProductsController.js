import productModels from "../models/Product";

class ProductsController {
  async index(req, res) {
    try {
      const products = await productModels.index();
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const product = await productModels.show(id);
      return res.status(200).json(product);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      await productModels.create(body);
      return res.status(201).json({ criado: body.description });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      await productModels.update(id, body);
      return res.status(200).json({ id_product: id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await productModels.destroy(id);
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal error" });
    }
  }
}

export default new ProductsController();
