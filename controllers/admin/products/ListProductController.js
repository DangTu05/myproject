const Products = require("../../../models/products/products");
const FilterStatusHelper = require("../../../helpers/products/FilterStatus");
const SearchHelper = require("../../../helpers/products/Search");
const PaginationHelper = require("../../../helpers/products/pagination.helper");
class ListProductController {
  async show(req, res, next) {
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
  async ChangeStatus(req, res, next) {
    const { _id, status } = req.body;
    try {
      await Products.updateOne({ _id }, { status });
      res.status(200).send("Cập nhật thành công");
    } catch (err) {
      res.status(500).send("Đã xảy ra lỗi");
    }
  }
  async ChangeMultiStatus(req, res, next) {
    const type = req.body.status;
    const ids = req.body._id;
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
      res.status(200).json({ message: "Cập nhật thành công " });
    } catch (err) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }

  /// soft delete
  async DeleteItem(req, res, next) {
    const id = req.body._id;
    const deletedBy = res.locals.user._id;
    try {
      await Products.updateOne({ _id: id }, { deleted: true, deletedBy });
      await Products.delete({ _id: id });
      res.status(200).json({ message: "Xóa thành công" });
    } catch (err) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }

  /// soft delete multi
  async DeleteMulti(req, res, next) {
    const ids = req.body._id;
    const deletedBy = res.locals.user._id;
    try {
      await Products.updateMany(
        { _id: { $in: ids } },
        { deletedBy: deletedBy }
      );
      await Products.delete({ _id: { $in: ids } });
      res.status(200).json({ message: "Xóa thành công" });
    } catch (err) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
}
module.exports = new ListProductController();
