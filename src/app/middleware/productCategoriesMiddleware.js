import productCategory from "../models/ProductCategory";

const checkDescription = async (req, res, next) => {
  const { description } = req.body;

  const productCategories = await productCategory.index();

  const verify = productCategories.filter(
    (category) => category.description === description
  );
  if (verify.length > 0) {
    return res.status(201).json("Existe contatato");
  }
  return next();
};

module.exports = {
  checkDescription,
};
