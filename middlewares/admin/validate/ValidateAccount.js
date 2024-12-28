class Validate {
  create(req, res, next) {
    if (!req.body.name) {
      res.json({ message: "Họ tên không được để trống!" });
      return;
    }
    if (!req.body.email) {
      res.json({ message: "Email không được để trống!" });
      return;
    }
    if (!req.body.password) {
      res.json({ message: "Mật khẩu không được để trống!" });
      return;
    }
    next();
  }
}
module.exports = new Validate();
