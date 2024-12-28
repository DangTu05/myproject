const Accounts = require("../../../models/accounts/account.model");
const Role = require("../../../models/roles/role.models");
const md5 = require("md5");
class AccountController {
  /// Show giao diện tạo tk
  async show(req, res, next) {
    const Roles = await Role.find({ deleted: false });
    try {
      res.render("./admin/pages/accounts/register", {
        Roles: Roles,
      });
    } catch (error) {}
  }
  /// End show giao diện tạo tk

  /// Tạo tài khoản
  async create(req, res, next) {
    try {
      req.body.password = md5(req.body.password);
      const account = new Accounts(req.body);
      account.save();
      return res.status(200).json({ message: "Tạo thành công!" });
    } catch (error) {
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// End tạo tk
}
module.exports = new AccountController();
