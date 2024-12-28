const Products = require("../../../models/products/products");

class CreateController {
  /// Show giao diện tạo sản phẩm
  async show(req, res, next) {
    const products = await Products.countDocuments({ deleted: false });
    res.render("./admin/pages/products/Create", {
      products: products,
    });
  }
  /// end show

  /// Tạo sản phẩm
  async create(req, res, next) {
    const product = new Products(req.body);
    try {
      await product.save()
      return res.status(200).json({ message: "Thành công!" });
    } catch (err) {
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// end tạo sản phẩm
}

module.exports = new CreateController();
