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

  /// Show danh sách tài khoản
  async showAccounts(req, res, next) {
    const accounts = await Accounts.find({ deleted: false }).select(
      "-token -password"
    );
    // Lấy vai trò cho tất cả tài khoản đồng thời
    const roles = await Promise.all(
      accounts.map(async (item) => {
        const role = await Role.findOne({ deleted: false, _id: item.role_id });
        return role;
      })
    );
    // Gán vai trò lại cho các tài khoản
    accounts.forEach((item, index) => {
      item.role = roles[index];
    });
    try {
      res.render("./admin/pages/accounts/AccountList", {
        accounts: accounts,
      });
    } catch (err) {
      res.redirect("/admin/dashboard");
    }
  }
  /// End show danh sách tài khoản

  ///Show sửa thông tin tài khoản
  async showEdit(req, res, next) {
    const id = req.params.id;
    const account = await Accounts.findOne({ _id: id });
    const Roles = await Role.find({ deleted: false });
    try {
      res.render("./admin/pages/accounts/Edit", {
        account: account,
        Roles: Roles,
      });
    } catch (error) {
      res.redirect("admin/dashboard ");
    }
  }
  /// End show sửa thông tin tài khoản

  /// Sửa thông tin tài khoản
  async edit(req, res, next) {
    const id = req.params.id;
    console.log(id);
    
    if (!req.file) {
      const account = await Accounts.findOne({ _id: id });
      req.body.img = account.img;
    }
    try {
      await Accounts.updateOne({ _id: id }, req.body);
      res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// End sửa thông tin tài khoản
}
module.exports = new AccountController();
