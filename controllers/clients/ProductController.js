const Products = require("../../models/products/products");
const SortHepler = require("../../helpers/client/Sort.helper");
const Category = require("../../models/categories/category.model");
const getSubCategory = require("../../helpers/client/Product-Category");
class ProductController {
  /// Show chi tiết sản phẩm
  async detail(req, res, next) {
    res.render("./clients/pages/products/Detail");
  }
  /// End show chi tiết sản phẩm

  /// Show giao diện danh sách sản phẩm nổi bật
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
    let from_to = "";
    // Kiểm tra xem có price_from và price_to trong params không
    if (req.query.price_from || req.query.price_to) {
      find.Price = {};
      if (req.query.price_from) {
        find.Price.$gte = parseFloat(req.query.price_from); // Giá từ
      }
      if (req.query.price_to) {
        find.Price.$lte = parseFloat(req.query.price_to); // Giá đến
      }
      from_to = req.query.price_from + "-" + req.query.price_to;
    }
    const Featured_Product = await Products.find(find).sort(sort);
    Featured_Product.forEach((item) => {
      const price = item.Price.toLocaleString("vi-VN");
      cost.push(price);
    });
    /// End lấy ra sản phẩm nổi bật và sắp xếp
    res.render("./clients/pages/products/ListFeatured", {
      Featured_Product: Featured_Product,
      cost: cost,
      Sort: Sort,
      from_to: from_to,
    });
  }
  /// End show giao diện danh sách sản phẩm nổi bật

  /// Show danh sách sản phẩm trong danh mục
  async showProduct(req, res, next) {
    /// Lấy ra danh mục có slug giống slugCategory
    const category = await Category.findOne({ slug: req.params.slugCategory });
    /// Lấy ra thông tin của sort bên helper
    const Sort = SortHepler.Sort(req.query);
    /// Lấy ra các sản phẩm nổi bật và sắp xếp
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort.product_name = "asc";
    }
    const subs = await getSubCategory.getSubCategory(category._id);
    const listId = subs.map((item) => item._id);
    let cost = [];
    let find = {
      deleted: false,
      status: "active",
      category_id: { $in: [category._id, ...listId] },
    };
    let from_to = "";
    // Kiểm tra xem có price_from và price_to trong params không
    if (req.query.price_from || req.query.price_to) {
      find.Price = {};
      if (req.query.price_from) {
        find.Price.$gte = parseFloat(req.query.price_from); // Giá từ
      }
      if (req.query.price_to) {
        find.Price.$lte = parseFloat(req.query.price_to); // Giá đến
      }
      from_to = req.query.price_from + "-" + req.query.price_to;
    }
    const products = await Products.find(find).sort(sort);
    products.forEach((item) => {
      const price = item.Price.toLocaleString("vi-VN");
      cost.push(price);
    });
    /// End lấy ra sản phẩm nổi bật và sắp xếp
    res.render("./clients/pages/products/ListProduct", {
      Products: products,
      cost: cost,
      Sort: Sort,
      from_to: from_to,
    });
  }
  /// End show danh sách sản phẩm trong danh mục
}
module.exports = new ProductController();
