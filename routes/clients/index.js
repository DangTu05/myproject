const show = require("./SiteRoute");
const products = require("./Product.route");
const search = require("./Search.route");
const cart = require("./cart.route");
function route(app) {
  app.use("/home", show);
  app.use("/product", products);
  app.use("/search", search);
  app.use("/cart", cart);
}
module.exports = route;
