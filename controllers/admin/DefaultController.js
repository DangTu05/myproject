const Products = require("../../models/products/products");
const Accounts = require("../../models/accounts/account.model");
const Categories = require("../../models/categories/category.model");
class SiteController {
  async show(req, res) {
    const user = await Accounts.findOne({
      deleted: false,
      token: req.cookies.token,
    });
    const countProduct = await Products.countDocuments({
      deleted: false,
      status: "active",
    });
    const countCategory = await Categories.countDocuments({
      deleted: false,
      status: "active",
    });
    const countAccount = await Accounts.countDocuments({
      deleted: false,
      status: "active",
    });

    res.render("./admin/pages/index", {
      countProduct: countProduct,
      user: user,
      countCategory: countCategory,
      countAccount: countAccount,
    });
  }
}
module.exports = new SiteController();
