const productCategories = require("../../../models/categories/category.model");
const Products = require("../../../models/products/products");
const buildCategoryTree = require("../../../helpers/products/buildCategoryTree.helper");
class CreateController {
  /// Show giao diện tạo sản phẩm
  async show(req, res) {
    try {
      const count = await Products.countDocuments({ deleted: false });
      const categories = await productCategories.find({
        deleted: false,
        status: "active",
      });
      const records = buildCategoryTree(categories);

      res.render("./admin/pages/categories/CreateCategory", {
        count: count,
        records: records, // Thêm categories vào render nếu cần
      });
    } catch (error) {
      // eslint-disable-next-line no-console
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
    } catch (err) {
      next(err);
    }
  }
  /// end show giao diện danh mục sản phẩm
  /// Tạo sản phẩm
  async create(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("category_create")) {
      return res.json({ message: "Bạn không có quyền tạo danh mục sản phẩm" });
    } else {
      req.body.createdBy = res.locals.user._id;
      try {
        const category = new productCategories(req.body);
        await category.save();
        return res.status(200).json({ message: "Thành công!" });
      } catch {
        return res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// end tạo sản phẩm

  /// Show giao diện chỉnh sửa
  async showEdit(req, res) {
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
      // eslint-disable-next-line no-console
      console.error("Error fetching categories:", error);
      return;
    }
  }
  /// change status
  async ChangeStatus(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("category_edit")) {
      return res.json({ message: "Bạn không có quyền sửa danh mục sản phẩm" });
    } else {
      const { _id, status } = req.body;
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      try {
        await productCategories.updateOne({ _id }, { status });
        await productCategories.updateOne(
          { _id },
          { $push: { updatedBy: updated } }
        );
        res.status(200).json("Cập nhật thành công");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching categories:", error);
        return;
      }
    }
  }
  /// end change status

  /// xóa mềm
  async Delete(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("category_delete")) {
      return res.json({ message: "Bạn không có quyền xóa danh mục sản phẩm" });
    } else {
      const _id = req.body._id;
      const deletedBy = res.locals.user._id;
      try {
        await productCategories.updateOne({ _id }, { deletedBy: deletedBy });
        await productCategories.delete({ _id });
        res.status(200).json({ message: "Xóa thành công!" });
      } catch {
        return res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// end xóa mềm
  /// chỉnh sửa sản phẩm
  async Edit(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("category_edit")) {
      return res.json({ message: "Bạn không có quyền sửa danh mục sản phẩm" });
    } else {
      if (!req.file) delete req.body.img;
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      try {
        await productCategories.updateOne({ _id: req.params.id }, req.body);
        await productCategories.updateOne(
          { _id: req.params.id },
          { $push: { updatedBy: updated } }
        );
        res.status(200).json({ message: "Thành công!" });
      } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }

    /// end chỉnh sửa sản phẩm
  }

  /// change-multi-status
  async ChangeMultiStatus(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("category_edit")) {
      return res.json({ message: "Bạn không có quyền sửa danh mục sản phẩm" });
    } else {
      const { ids, status } = req.body;
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      try {
        await productCategories.updateMany({ _id: { $in: ids } }, { status });
        await productCategories.updateMany(
          { _id: { $in: ids } },
          { $push: { updatedBy: updated } }
        );
        res.status(200).json("Cập nhật thành công");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching categories:", error);
        return;
      }
    }
  }
  /// end change-multi-status

  /// xóa nhiều
  async DeleteMulti(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("category_delete")) {
      return res.json({ message: "Bạn không có quyền xóa danh mục sản phẩm" });
    } else {
      const ids = req.body._id;
      const deletedBy = res.locals.user._id;
      try {
        await productCategories.updateMany(
          { _id: { $in: ids } },
          { deletedBy: deletedBy }
        );
        await productCategories.deleteMany({ _id: { $in: ids } });
        res.status(200).json("Xóa thành công");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching categories:", error);
        return;
      }
    }
  }
  /// end xóa nhiều
}

module.exports = new CreateController();
