const Products = require("../../models/products/products");
class ProductController {
  async detail(req, res, next) {
    res.render("./clients/pages/products/Detail");
  }
  async showFeatured(req, res, next) {
    /// Lấy ra các sản phẩm
    let cost = [];
    let find = {
      deleted: false,
      status: "active",
      featured: "1",
    };
    const Featured_Product = await Products.find(find);
    Featured_Product.forEach((item) => {
      const price = item.Price.toLocaleString("vi-VN");
      cost.push(price);
    });
    res.render("./clients/pages/products/ListFeatured", {
      Featured_Product: Featured_Product,
      cost: cost,
    });
  }
}
module.exports = new ProductController();
