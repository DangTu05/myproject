/* eslint-disable indent */
const Products = require("../../../models/products/products");
const FilterStatusHelper = require("../../../helpers/products/FilterStatus");
const SearchHelper = require("../../../helpers/products/Search");
const PaginationHelper = require("../../../helpers/products/pagination.helper");

class ListProductController {
  /// Show danh sách sản phẩm
  async show(req, res) {
    ///Bộ lọc tìm kiếm
    const FilterStatus = FilterStatusHelper(req.query);
    let find = {};
    if (req.query.status) {
      find.status = req.query.status;
    }
    const ObjectSearch = SearchHelper(req.query);
    if (ObjectSearch.regex) {
      find.product_name = ObjectSearch.regex;
    }
    find.deleted = false;
    const CountProduct = await Products.countDocuments(find);
    const Count_Deleted = await Products.countDocuments({ deleted: true });
    /// Phân trang
    const ObjectPagination = PaginationHelper(
      {
        currentPage: 1,
        limitItems: 4,
      },
      req.query,
      CountProduct
    );
    // Sắp xếp
    let sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort.product_name = "asc";
    }
    const products = await Products.find(find)
      .sort(sort)
      .limit(ObjectPagination.limitItems)
      .skip(ObjectPagination.skip);
    res.render("./admin/pages/products/ListProduct", {
      products: products,
      FilterStatus: FilterStatus,
      keyword: ObjectSearch.keyword,
      ObjectPagination: ObjectPagination,
      Count_Deleted: Count_Deleted,
    });
  }
  /// End sắp xếp

  /// End show danh sách sản phẩm

  /// thay đổi trạng thái
  async ChangeStatus(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("product_edit")) {
      return res.json({ message: "Bạn không có quyền sửa" });
    } else {
      const { _id, status } = req.body;
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      try {
        await Products.updateOne({ _id }, { status });
        await Products.updateOne({ _id }, { $push: { updatedBy: updated } });
        res.status(200).send("Cập nhật thành công");
      } catch {
        res.status(500).send("Đã xảy ra lỗi");
      }
    }
  }
  /// End thay đổi trạng thái

  /// thay đổi trạng thái nhiều
  async ChangeMultiStatus(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("product_edit")) {
      return res.json({ message: "Bạn không có quyền sửa" });
    } else {
      const type = req.body.status;
      const ids = req.body._id;
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      try {
        switch (type) {
          case "active":
            await Products.updateMany(
              { _id: { $in: ids } },
              { status: "active" }
            );
            break;
          case "inactive":
            await Products.updateMany(
              { _id: { $in: ids } },
              { status: "inactive" }
            );
            break;
          default:
            break;
        }
        await Products.updateMany(
          { _id: { $in: ids } },
          { $push: { updatedBy: updated } }
        );
        res.status(200).json({ message: "Cập nhật thành công " });
      } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// End thay đổi trạng thái nhiều

  /// soft delete
  async DeleteItem(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("product_delete")) {
      return res.json({ message: "Bạn không có quyền xóa" });
    } else {
      const id = req.body._id;
      const deletedBy = res.locals.user._id;
      try {
        await Products.updateOne({ _id: id }, { deleted: true, deletedBy });
        await Products.delete({ _id: id });
        res.status(200).json({ message: "Xóa thành công" });
      } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }

  /// End soft delete

  /// soft delete multi
  async DeleteMulti(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("product_create")) {
      return res.json({ message: "Bạn không có quyền xóa" });
    } else {
      const ids = req.body._id;
      const deletedBy = res.locals.user._id;
      try {
        await Products.updateMany(
          { _id: { $in: ids } },
          { deletedBy: deletedBy }
        );
        await Products.delete({ _id: { $in: ids } });
        res.status(200).json({ message: "Xóa thành công" });
      } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }

  /// End soft delete multi
}
module.exports = new ListProductController();
