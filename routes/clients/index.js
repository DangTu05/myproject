const show = require("./SiteRoute");
const detail = require("./products/Detail.router");
function route(app) {
  app.use("/home", show);
  app.use("/product", detail);
}
module.exports = route;
