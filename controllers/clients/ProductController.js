const Products = require("../../models/products/products");
const Feedback = require("../../models/Users/feedback.model");
const SortHepler = require("../../helpers/client/Sort.helper");
const Category = require("../../models/categories/category.model");
const User = require("../../models/Users/user.model");
const getSubCategory = require("../../helpers/client/Product-Category");
class ProductController {
  /// Show chi tiết sản phẩm
  async detail(req, res, next) {
    const users = await User.find({});
    const feedbacks = await Feedback.find({});
    const users_feedback = feedbacks.map((item) => {
      return users.find((user) => {
        return user._id.toString() === item.user_id;
      });
    });
    res.render("./clients/pages/products/Detail", {
      feedbacks: feedbacks,
      users_feedback: users_feedback,
    });
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

  /// Feedback sản phẩm
  async feedback(req, res, next) {
    if (!req.cookies.tokenUser) {
      req.flash("error", "Vui lòng đăng nhập");
      return res.redirect("/user/login");
    }
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
    });
    const product_id = Products.findOne({
      slug: req.params.slug,
    });
    if (req.body.comment) {
      const feedback = new Feedback({
        user_id: user._id,
        content: req.body.comment,
        product_id: product_id._id,
      });
      await feedback.save();
    }
    return res.redirect("back");
  }
  /// End feedback sản phẩm
}
module.exports = new ProductController();
