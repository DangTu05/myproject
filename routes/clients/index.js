const show = require("./SiteRoute");
const products = require("./Product.route");
function route(app) {
  app.use("/home", show);
  app.use("/product", products);
}
module.exports = route;
