const productCategories = require("../../../models/products/category.model");
const Products = require("../../../models/products/products");
class CreateController {
  /// Show giao diện tạo sản phẩm
  async show(req, res, next) {
    const count = await Products.countDocuments({ deleted: false });
    res.render("./admin/pages/products/Product-Category", {
      count: count,
    });
  }
  /// end show sản phẩm
  /// show giao diện danh mục sản phẩm
  async Detail(req, res, next) {
    let find = {
      deleted: false,
    };
    const records = await productCategories.find(find);
    res.render("./admin/pages/products/Category", {
      records: records,
    });
  }
  /// end show giao diện danh mục sản phẩm
  /// Tạo sản phẩm
  async create(req, res, next) {
    const category = new productCategories(req.body);
    try {
      await category.save().then(() => {
        return res.status(200).json({ message: "Thành công!" });
      });
    } catch (err) {
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// end tạo sản phẩm
}
module.exports = new CreateController();
/// end show
