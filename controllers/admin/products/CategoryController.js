const productCategories = require("../../../models/products/category.model");

class CreateController {
  /// Show giao diện tạo sản phẩm
  async show(req, res, next) {
    // const products = await Products.countDocuments({ deleted: false });
    res.render("./admin/pages/products/Product-Category", {});
  }
  /// end show sản phẩm
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
