const Site_Admin = require("./products/Site_Admin.route");
const systemConfig = require("../../configs/system");
const ListProduct = require("./products/ListProduct.route");
const Create = require("./products/Create.router");
const Edit = require("./products/EditProduct.router");
const Detail = require("./products/Detail.router");
function router(app) {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", Site_Admin);
  app.use(PATH_ADMIN + "/Products", ListProduct);
  app.use(PATH_ADMIN, Detail);
  app.use(PATH_ADMIN, Create);
  app.use(PATH_ADMIN, Edit);
}
module.exports = router;
