class Validate {
  login(req, res, next) {
    if (req.body.email == "") {
      res.json({ message: "email không được để trống" });
      return;
    }
    if (!req.body.password) {
      res.json({ message: "password không được để trống" });
      return;
    }
    next();
  }
}
module.exports = new Validate();
