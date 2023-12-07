import productCategoryModels from "../models/ProductCategory";

class ProductCategoriesController {
  async index(req, res) {
    const productCategories = await productCategoryModels.index();
    return res.status(200).json(productCategories);
  }

  async show(req, res) {
    const { id } = req.params;
    const productCategory = await productCategoryModels.show(id);
    return res.status(200).json(productCategory);
  }

  async create(req, res) {
    const { body } = req;
    await productCategoryModels.create(body);
    return res.status(201).json({ criado: body.description });
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    await productCategoryModels.update(id, body);
    return res.status(200).json({ id_categoria: id });
  }

  async destroy(req, res) {
    const { id } = req.params;
    await productCategoryModels.destroy(id);
    return res.status(204).json();
  }
}

export default new ProductCategoriesController();
