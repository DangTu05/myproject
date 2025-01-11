const Products = require("../../models/products/products");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  async show(req, res, next) {
    try {
      res.render("./clients/pages/home");
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SiteController();
