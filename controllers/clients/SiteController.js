const Products = require("../../models/products/products");
const { mutipleMongooseToObject } = require("../../util/mongoose");
class SiteController {
  async show(req, res, next) {
    try {
      let find = {};
      let Price = [];
      find.deleted = false;
      const products = await Products.find(find);
      products.forEach((item) => {
        const price = item.Price.toLocaleString("vi-VN");
        Price.push(price);
      });
      console.log(products);
      res.render("./clients/pages/home", {
        products: mutipleMongooseToObject(products),
        Price: Price,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new SiteController();
