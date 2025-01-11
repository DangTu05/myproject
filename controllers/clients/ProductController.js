const Products = require("../../models/products/products");
const SortHepler = require("../../helpers/client/Sort.helper");
class ProductController {
  async detail(req, res, next) {
    res.render("./clients/pages/products/Detail");
  }
  async showFeatured(req, res, next) {
    /// Lấy ra thông tin của sort bên helper
    const Sort = SortHepler.Sort(req.query);
    /// Lấy ra các sản phẩm nổi bật và sắp xếp
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort.product_name = "asc";
    }
    let cost = [];
    let find = {
      deleted: false,
      status: "active",
      featured: "1",
    };
    const Featured_Product = await Products.find(find).sort(sort);
    console.log(Featured_Product);
    Featured_Product.forEach((item) => {
      const price = item.Price.toLocaleString("vi-VN");
      cost.push(price);
    });
    res.render("./clients/pages/products/ListFeatured", {
      Featured_Product: Featured_Product,
      cost: cost,
      Sort: Sort,
    });
  }
}
module.exports = new ProductController();
