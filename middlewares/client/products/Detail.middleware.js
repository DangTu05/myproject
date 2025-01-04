const Products = require("../../../models/products/products");
const accounting = require("accounting");
module.exports.data = async (req, res, next) => {
  const slug = req.params.slug;
  const product = await Products.findOne({ slug: slug });
  const Price = accounting.formatMoney(product.Price, "₫", 0, ".", ",");
  res.locals.product = product;
  res.locals.Price = Price;
  next();
};
