const Site_Admin = require("./products/Default.route");
const systemConfig = require("../../configs/system");
const ListProduct = require("./products/ListProduct.route");
const Create = require("./products/Create.route");
const Edit = require("./products/EditProduct.route");
const Detail = require("./products/Detail.route");
const CreateCategory = require("./categories/Category.route");
const Role = require("./roles/role.route");
const Accounts = require("./accounts/account.route");
const Auth = require("./auth/auth.route");
const MyAccout = require("./my-account/index.route");
const Chat=require("./chats/chat.route");
const SettingMiddleware = require("../../middlewares/admin/auth/setting.middleware");
function router(app) {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(SettingMiddleware.setting);
  app.use(PATH_ADMIN + "/dashboard", Site_Admin);
  app.use(PATH_ADMIN + "/Products", ListProduct);
  app.use(PATH_ADMIN, CreateCategory);
  app.use(PATH_ADMIN, Detail);
  app.use(PATH_ADMIN + "/product", Create);
  app.use(PATH_ADMIN + "/product", Edit);
  app.use(PATH_ADMIN + "/account", Accounts);
  app.use(PATH_ADMIN + "/role", Role);
  app.use(PATH_ADMIN + "/auth", Auth);
  app.use(PATH_ADMIN + "/my-account", MyAccout);
  app.use(PATH_ADMIN + "/chat", Chat);
}
module.exports = router;
