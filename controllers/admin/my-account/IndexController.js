const Time = require("../../../util/times/VnTime");
const md5 = require("md5");
const Accounts = require("../../../models/accounts/account.model"); 
class MyAccout {
  /// Show giao diện trang cá nhân
  async index(req, res) {
    let time = {};
    if (res.locals.user.updatedAt) {
      time.createdAt = Time(res.locals.user.createdAt);
    }
    if (res.locals.user.updatedAt) {
      time.updatedAt = Time(res.locals.user.updatedAt);
    }
    res.locals.user.time = time;
    res.render("admin/pages/my-account/Index");
  }
  /// End show giao diện trang cá nhân

  /// Show giao diện sửa thông tin cá nhân
  async showEdit(req, res) {    
    res.render("admin/pages/my-account/Edit");
  }
  /// End show giao diện sửa thông tin cá nhân

  /// Sửa thông tin cá nhân
  async edit(req, res, next) {
    try {
      const id = res.locals.user._id;
      if (!req.file) {
        delete req.body.img;
      }
      if (req.body.password) {
        req.body.password = md5(req.body.password);
      } else {
        delete req.body.password;
      }      
      await Accounts.updateOne({ _id: id }, req.body);
      res.status(200).json({ message: "Cập nhật thành công" });
    } catch (error) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
  /// End sửa thông tin cá nhân
}
module.exports = new MyAccout();
