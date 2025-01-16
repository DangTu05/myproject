const Accounts = require("../../../models/accounts/account.model");
const md5 = require("md5");
const systemConfig = require("../../../configs/system");
class AuthController {
  async showLogin(req, res, next) {
    res.render("admin/pages/auth/login");
  }
  async login(req, res, next) {
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
  async logout(req, res, next) {
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
  }
}
module.exports = new AuthController();
