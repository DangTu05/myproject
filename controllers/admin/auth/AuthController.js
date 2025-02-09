const Accounts = require("../../../models/accounts/account.model");
const md5 = require("md5");
const systemConfig = require("../../../configs/system");
class AuthController {
  /// Show giao diện đăng nhập
  async showLogin(req, res) {
    res.render("admin/pages/auth/login");
  }
  /// End show giao diện đăng nhập

  /// Đăng nhập
  async login(req, res) {
    const user = await Accounts.findOne({
      email: req.body.email,
      deleted: false,
    });
    try {
      if (!user) {
        res.json({ message: "Tài khoản không tồn tại!" });
        return;
      }
      if (md5(req.body.password) !== user.password) {
        res.json({ message: "Mật khẩu không đúng!" });
        return;
      }
      if (user.status === "inactive") {
        res.json({ message: "Tài khoản này đã bị khóa" });
        return;
      }
      const time = 1000 * 60 * 60 * 24 * 7;
      res.cookie("token", user.token, { maxAge: time });
      return res.status(200).json({ message: "Đăng nhập thành công!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  /// End đăng nhập

  /// Đăng xuất
  async logout(req, res) {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
  /// End đx
}
module.exports = new AuthController();
