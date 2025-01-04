const Products = require("../../models/products/products");
class Detail {
  async Detail(req, res, next) {
    res.render("./clients/pages/products/Detail");
  }
}
module.exports = new Detail();
