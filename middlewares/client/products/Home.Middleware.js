const Tree = require("../../../helpers/products/buildCategoryTree.helper");
const categories = require("../../../models/categories/category.model");
const Products = require("../../../models/products/products");
const accounting = require("accounting");
module.exports.locals = async (req, res, next) => {
  /// Lấy ra các danh mục
  const categoties = await categories.find({
    deleted: false,
    status: "active",
  });
  /// Lấy ra sản phẩm nổi bật
  const featuredProducts = await Products.find({
    deleted: false,
    status: "active",
    featured: "1",
  });
  const Price = await Promise.all(
    featuredProducts.map(async (item) => {
      const price = accounting.formatMoney(item.Price, "₫", 0, ".", ",");
      return price;
    })
  );
  res.locals.newCategory = Tree(categoties);
  res.locals.featuredProducts = featuredProducts;
  res.locals.priceArray = Price;
  next();
};
