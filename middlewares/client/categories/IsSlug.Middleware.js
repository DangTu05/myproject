const categories = require("../../../models/categories/category.model");
module.exports.isSlug = async (req, res, next) => {
  const category = await categories.findOne({ slug: req.params.slugCategory });
  if (!category) return next("route");
  else next();
};
