const productCategories = require("../../../models/categories/category.model");
const Products = require("../../../models/products/products");
const buildCategoryTree = require("../../../helpers/products/buildCategoryTree.helper");
class CreateController {
  /// Show giao diện tạo sản phẩm
  async show(req, res, next) {
    try {
      const count = await Products.countDocuments({ deleted: false });
      const categories = await productCategories.find({ deleted: false });
      const records = buildCategoryTree(categories);
      res.render("./admin/pages/categories/CreateCategory", {
        count: count,
        records: records, // Thêm categories vào render nếu cần
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return;
    }
  }
  /// end show sản phẩm
  /// show giao diện danh mục sản phẩm
  async Detail(req, res, next) {
    try {
      let find = {
        deleted: false,
      };
      const records = await productCategories.find(find);
      const categories = buildCategoryTree(records);
      res.render("./admin/pages/categories/Category", {
        records: categories,
      });
    } catch (error) {
      res.redirect("dashboard");
    }
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
  async showEdit(req, res, next) {
    try {
      const id = req.params.id;
      const categories = await productCategories.find({ deleted: false });
      const records = buildCategoryTree(categories);
      const category = await productCategories.findOne({ _id: id });
      res.render("./admin/pages/categories/EditCategory", {
        category: category,
        records: records,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      return;
    }
  }
  /// change status
  async ChangeStatus(req, res, next) {
    const { _id, status } = req.body;
    try {
      await productCategories.updateOne({ _id }, { status });
      res.status(200).json("Cập nhật thành công");
    } catch (error) {
      console.error("Error fetching categories:", error);
      return;
    }
  }
  /// end change status

  /// xóa mềm
  async Delete(req, res, next) {
    const _id = req.body._id;
    console.log(_id);
    try {
      await productCategories.delete({ _id });
      res.status(200).json({ message: "Xóa thành công!" });
    } catch (error) {
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// end xóa mềm
  /// chỉnh sửa sản phẩm
  async Edit(req, res, next) {
    if (!req.file) {
      const category = await productCategories.findOne({ _id: req.params.id });
      req.body.img = category.img;
    }
    try {
      await productCategories
        .updateOne({ _id: req.params.id }, req.body)
        .then(() => {
          res.status(200).json({ message: "Thành công!" });
        });
    } catch (error) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
    /// end chỉnh sửa sản phẩm
  }

  /// change-multi-status
  async ChangeMultiStatus(req, res, next) {
    const { ids, status } = req.body;
    try {
      await productCategories.updateMany({ _id: { $in: ids } }, { status });
      res.status(200).json("Cập nhật thành công");
    } catch (error) {
      console.error("Error fetching categories:", error);
      return;
    }
  }
  /// end change-multi-status
}

module.exports = new CreateController();
