const User = require("../../models/Users/user.model");
const md5 = require("md5");
const time = require("../../util/times/VnTime");
class UserController {
  /// Show giao diện đăng kí
  async showRegister(req, res) {
    res.render("./clients/pages/users/register");
  }
  /// End show giao diện đăng kí

  /// Đăng kí tài khoản
  async register(req, res) {
    try {
      req.body.password = md5(req.body.password);
      console.log(req.body);
      const user = new User(req.body);
      await user.save();
      return res.redirect("/user/login");
      
    } catch {
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// End đăng kí tài khoản
  /// Show giao diện đăng nhập
  async showLogin(req, res) {
    res.render("./clients/pages/users/login");
  }
  /// End show giao diện đăng nhập

  /// Đăng nhập tài khoản
  async login(req, res) {
    try {
      const user = await User.findOne({
        email: req.body.email,
        deleted: false,
      });
      if (!user) {
        return res.json({ message: "Tài khoản không tồn tại!" });
      }
      if (md5(req.body.password) !== user.password) {
        return res.json({ message: "Mật khẩu không đúng!" });
      }
      if (user.status === "inactive") {
        return res.json({ message: "Tài khoản này đã bị khóa" });
      }
      const time = 1000 * 60 * 60 * 24 * 7;
      res.cookie("tokenUser", user.tokenUser, { maxAge: time });
      return res.status(200).json({ message: "Đăng nhập thành công!" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  /// End đăng nhập tài khoản

  /// Đăng xuất
  async logout(req, res) {
    res.clearCookie("tokenUser");
    res.redirect("/home");
  }
  /// End đăng xuất

  /// Show thông tin tài khoản
  async profile(req, res) {
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
    }).select("-password");
    let createdAt = time(user.createdAt);
    res.render("./clients/pages/users/profile", {
      user: user,
      createdAt: createdAt,
    });
  }
  /// End show thông tin
}
module.exports = new UserController();
