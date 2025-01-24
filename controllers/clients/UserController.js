const User = require("../../models/Users/user.model");
const md5 = require("md5");
/// config thời gian về thời gian Việt Nam
const time = require("../../util/times/VnTime");
/// Random OTP
const generateOTP = require("../../helpers/client/GenerateOtp.helper");
const ForgotPassword = require("../../models/Users/forgotPass.model");
const SendMail = require("../../helpers/client/SendEmail.helper");
class UserController {
  /// Show giao diện đăng kí
  async showRegister(req, res) {
    res.render("./clients/pages/users/register");
  }
  /// End show giao diện đăng kí

  /// Đăng kí tài khoản
  async register(req, res) {
    try {
      /// Mã hóa mật khẩu
      req.body.password = md5(req.body.password);
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
      /// set cookie thời gian sống là 7 ngày
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
    /// Xóa cookie khi đăng xuất
    res.clearCookie("tokenUser");
    res.redirect("/home");
  }
  /// End đăng xuất

  /// Show thông tin tài khoản
  async profile(req, res) {
    /// Lấy ra tài khoản thông qua tokenUser(trừ mật khẩu)
    const user = await User.findOne({
      tokenUser: req.cookies.tokenUser,
    }).select("-password");
    /// Config thời gian tạo về kiểu thời gian Việt Nam
    let createdAt = time(user.createdAt);
    res.render("./clients/pages/users/profile", {
      user: user,
      createdAt: createdAt,
    });
  }
  /// End show thông tin

  /// Show giao diện quên mật khẩu
  async showForgotPassword(req, res) {
    res.render("./clients/pages/users/forgot-password");
  }
  /// End show giao diện quên mật khẩu

  /// Quên mật khẩu
  async forgotPassword(req, res) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      req.flash("error", "Email không tồn tại");
      return res.redirect("back");
    }
    /// Kiểm tra xem có bản ghi nào chưa nếu có thì xóa đi
    const record = await ForgotPassword.findOne({ email: req.body.email });
    if (record) {
      await record.deleteOne();
    }
    const object = {
      email: req.body.email,
      otp: generateOTP(8),
    };
    const forgotPassword = new ForgotPassword(object);
    await forgotPassword.save();
    var subject = `Mã OTP lấy lại mật khẩu`;
    var html = `Mã OTP của bạn là: <b>${object.otp}</b>`;
    /// Gửi mail
    SendMail(req.body.email, subject, html);
    res.redirect(`/user/otp-password?email=${req.body.email}`);
  }
  /// End quên mật khẩu

  /// Show giao diện nhập OTP
  async showOTPPassword(req, res) {
    const email = req.query.email;
    res.render("./clients/pages/users/otp-password", {
      email: email,
    });
  }
  /// End show giao diện nhập OTP

  /// Xác nhận OTP
  async otpPassword(req, res) {
    const { email, otp } = req.body;
    const otpPassword = await ForgotPassword({ email, otp });
    if (!otpPassword) {
      req.flash("error", "OTP không đúng");
      return res.redirect("back");
    }
    res.redirect(`/user/change-password?email=${email}`);
  }
  /// End xác nhận OTP

  /// Show giao diện đổi mật khẩu
  async showChangePassword(req, res) {
    res.render("./clients/pages/users/change-password", {});
  }
  /// End show giao diện đổi mật khẩu

  /// Đổi mật khẩu
  async changePassword(req, res) {
    if (req.body.newPassword !== req.body.cfNewPassword) {
      req.flash("error", "Mật khẩu không khớp");
      return res.redirect("back");
    }
    const email = req.query.email;
    const user = await User.findOne({ email: email });
    await user.updateOne({ password: md5(req.body.newPassword) });
    req.flash("success", "Đổi mật khẩu thành công");
    res.redirect("/user/login");
  }
  /// End đổi mật khẩu
}
module.exports = new UserController();
