const Products = require("../../models/products/products");
const Accounts = require("../../models/accounts/account.model");
class SiteController {
  async show(req, res, next) {
    const count = await Products.countDocuments({ deleted: false });
    res.render("./admin/pages/index", {
      count: count,
    });
  }
}
module.exports = new SiteController();
