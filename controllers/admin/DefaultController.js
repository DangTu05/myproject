const Products = require("../../models/products/products");
class SiteController {
  async show(req, res, next) {
    const count = await Products.countDocuments({ deleted: false });
    res.render("./admin/layouts/default", {
      count: count,
    });
  }
}
module.exports = new SiteController();
