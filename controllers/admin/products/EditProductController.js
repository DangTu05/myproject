const Products = require("../../../models/products/products");

class EditController {
  /// Show giao diện tạo sản phẩm
  async show(req, res, next) {
    const id = req.params.id;
    try {
      const Count = await Products.countDocuments({ deleted: false });
      const product = await Products.findOne({ _id: id });
      res.render("admin/pages/products/EditProduct", {
        Count: Count,
        product: product,
      });
    } catch (error) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// end show

  /// Sửa sản phẩm
  async Edit(req, res, next) {
    let id = req.params.id; 
    if (!req.file) {
      const product = await Products.findOne({ _id: id });
      req.body.img = product.img;
    }
    try {
      await Products.updateOne({ _id: id }, req.body).then(() => {
        res.status(200).json({ message: "Thành công!" });
      });
    } catch (err) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  ///end sửa sản phẩm
}

module.exports = new EditController();
