const Accounts = require("../../../models/accounts/account.model");
const Role = require("../../../models/roles/role.models");
const md5 = require("md5");
const generateToken = require("../../../helpers/accounts/generate.helper");
class AccountController {
  /// Show giao diện tạo tk
  async show(req, res) {
    const Roles = await Role.find({ deleted: false });
    try {
      res.render("./admin/pages/accounts/Create", {
        Roles: Roles,
      });
    } catch {
      res.redirect("/admin/dashboard");
    }
  }
  /// End show giao diện tạo tk

  /// Tạo tài khoản
  async create(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("account_create")) {
      return res.json({ message: "Bạn không có quyền tạo tài khoản" });
    } else {
      try {
        if (!req.file) {
          delete req.body.img;
        }
        req.body.createdBy = res.locals.user._id;
        req.body.password = md5(req.body.password);
        req.body.token = generateToken(20);
        const account = new Accounts(req.body);
        account.save();
        return res.json({ message: "Tạo thành công!" });
      } catch {
        return res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// End tạo tk

  /// Show danh sách tài khoản
  async showAccounts(req, res) {
    const accounts = await Accounts.find({
      deleted: false,
      /// $ne :not-equal
      _id: { $ne: res.locals.user._id },
    }).select("-token -password");
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
    } catch {
      res.redirect("/admin/dashboard");
    }
  }
  /// End show danh sách tài khoản

  ///Show sửa thông tin tài khoản
  async showEdit(req, res) {
    const id = req.params.id;
    const account = await Accounts.findOne({ _id: id });
    const Roles = await Role.find({ deleted: false });
    try {
      res.render("./admin/pages/accounts/Edit", {
        account: account,
        Roles: Roles,
      });
    } catch {
      res.redirect("admin/dashboard ");
    }
  }
  /// End show sửa thông tin tài khoản

  /// Sửa thông tin tài khoản
  async edit(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("account_edit")) {
      return res.json({ message: "Bạn không có quyền sửa tài khoản" });
    } else {
      const id = req.params.id;
      const updated = {
        user_id: res.locals.user._id,
        updateAt: new Date(),
      };
      try {
        if (!req.file) delete req.body.img;
        if (req.body.password) {
          req.body.password = md5(req.body.password);
        } else {
          delete req.body.password;
        }
        await Accounts.updateOne({ _id: id }, req.body);
        await Accounts.updateOne(
          { _id: id },
          // push vào mảng updatedBy trong db
          { $push: { updatedBy: updated } }
        );
        res.status(200).json({ message: "Cập nhật thành công" });
      } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// End sửa thông tin tài khoản

  /// Xóa tài khoản
  async delete(req, res) {
    const role = res.locals.role;
    if (!role.permissions.includes("account_delete")) {
      return res.json({ message: "Bạn không có quyền xóa tài khoản" });
    } else {
      const id = req.body._id;
      const deletedBy = res.locals.user._id;
      try {
        await Accounts.delete({ _id: id });
        await Accounts.updateOne({ _id: id }, { deletedBy: deletedBy });
        res.status(200).json({ message: "Xóa thành công" });
      } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  /// End xóa tài khoản
}
module.exports = new AccountController();
