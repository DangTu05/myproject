const Products = require("../../../models/products/products");

class EditController {
  /// Show giao diện tạo sản phẩm
  async show(req, res) {
    const id = req.params.id;
    try {
      const Count = await Products.countDocuments({ deleted: false });
      const product = await Products.findOne({ _id: id });
      res.render("admin/pages/products/EditProduct", {
        Count: Count,
        product: product,
      });
    } catch {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// end show

  /// Sửa sản phẩm
  async Edit(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("product_create")) {
      return res.json({ message: "Bạn không có quyền tạo sản phẩm" });
    } else {
      let id = req.params.id;
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      if (!req.file) delete req.body.img;
      if (!req.body.description) delete req.body.description;
      try {
        await Products.updateOne({ _id: id }, req.body);
        await Products.updateOne(
          { _id: id },
          { $push: { updatedBy: updated } }
        );
        return res.status(200).json({ message: "Thành công!" });
      } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  ///end sửa sản phẩm
}

module.exports = new EditController();
