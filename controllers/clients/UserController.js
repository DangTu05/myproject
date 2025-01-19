const User = require("../../models/Users/user.model");
const md5 = require("md5");
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
      return res.status(200).json({ message: "Tạo thành công!" });
    } catch {
      return res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// End đăng kí tài khoản
}
module.exports = new UserController();
