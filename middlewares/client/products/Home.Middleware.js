const Tree = require("../../../helpers/products/buildCategoryTree.helper");
const categories = require("../../../models/categories/category.model");
module.exports.locals = async (req, res, next) => {
  const categoties = await categories.find({
    deleted: false,
    status: "active",
  });
  res.locals.newCategory = Tree(categoties);
  next();
};
