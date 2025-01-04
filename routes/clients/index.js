const show = require("./SiteRoute");
const detail = require("./Product.route");
function route(app) {
  app.use("/home", show);
  app.use("/product", detail);
}
module.exports = route;
