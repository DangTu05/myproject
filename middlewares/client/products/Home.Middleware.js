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
  }).limit(3);
  const Price = await Promise.all(
    featuredProducts.map(async (item) => {
      const price = accounting.formatMoney(item.Price, "₫", 0, ".", ",");
      return price;
    })
  );
  /// Lấy ra các sản phẩm
  let Cost = [];
  let find = {
    deleted: false,
    status: "active",
  };
  const products = await Products.find(find).limit(10);
  products.forEach((item) => {
    const price = item.Price.toLocaleString("vi-VN");
    Cost.push(price);
  });
  /// Lấy ra config dữ liệu bên chi tiết sản phẩm
  if (req.params.slug) {
    const slug = req.params.slug;
    const product = await Products.findOne({ slug: slug });
    const Price = accounting.formatMoney(product.Price, "₫", 0, ".", ",");
    res.locals.product = product;
    res.locals.Price = Price;
  }
  res.locals.products = products;
  res.locals.Cost = Cost;
  res.locals.newCategory = Tree(categoties);
  res.locals.featuredProducts = featuredProducts;
  res.locals.priceArray = Price;
  next();
};
