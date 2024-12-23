const Site_Admin = require("./products/Default.route");
const systemConfig = require("../../configs/system");
const ListProduct = require("./products/ListProduct.route");
const Create = require("./products/Create.route");
const Edit = require("./products/EditProduct.route");
const Detail = require("./products/Detail.route");
const CreateCategory = require("./categories/Category.route");
function router(app) {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", Site_Admin);
  app.use(PATH_ADMIN + "/Products", ListProduct);
  app.use(PATH_ADMIN, CreateCategory);
  app.use(PATH_ADMIN, Detail);
  app.use(PATH_ADMIN, Create);
  app.use(PATH_ADMIN, Edit);
}
module.exports = router;
