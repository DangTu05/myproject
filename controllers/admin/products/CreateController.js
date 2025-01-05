const Products = require("../../../models/products/products");
const Categories = require("../../../models/categories/category.model");
const buildCategoryTree = require("../../../helpers/products/buildCategoryTree.helper");
class CreateController {
  /// Show giao diện tạo sản phẩm
  async show(req, res, next) {
    const categories = await Categories.find({
      deleted: false,
      status: "active",
    });
    const records = buildCategoryTree(categories);
    const products = await Products.countDocuments({ deleted: false });
    res.render("./admin/pages/products/Create", {
      products: products,
      records: records,
    });
  }
  /// end show

  /// Tạo sản phẩm
  async create(req, res, next) {
    req.body.createdBy = res.locals.user._id;
    console.log(req.body);
    
    const product = new Products(req.body);
    try {
      await product.save();
      return res.status(200).json({ message: "Thành công!" });
    } catch (err) {
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// end tạo sản phẩm
}

module.exports = new CreateController();
