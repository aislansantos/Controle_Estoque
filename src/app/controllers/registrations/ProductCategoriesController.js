import productCategoryModels from "../../models/registrations/ProductCategory";

class ProductCategoriesController {
  async index(req, res) {
    try {
      const productCategories = await productCategoryModels.index();
      return res.status(200).json(productCategories);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const productCategory = await productCategoryModels.show(id);
      return res.status(200).json(productCategory);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async create(req, res) {
    try {
      const { body } = req;
      await productCategoryModels.create(body);
      return res.status(201).json({ criado: body.description });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;
      await productCategoryModels.update(id, body);
      return res.status(200).json({ id_categoria: id });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;
      await productCategoryModels.destroy(id);
      return res.status(204).json();
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new ProductCategoriesController();
