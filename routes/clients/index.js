const show = require("./SiteRoute");
const products = require("./Product.route");
const search = require("./Search.route");
function route(app) {
  app.use("/home", show);
  app.use("/product", products);
  app.use("/search", search);
}
module.exports = route;
