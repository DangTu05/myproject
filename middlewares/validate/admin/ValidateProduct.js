class Validate {
  create(req, res, next) {
    
    if (!req.body.product_name) {
      res.json({ message: "Tên sản phẩm không được để trống!" });
      return;
    }
    next();
  }
}
module.exports = new Validate();
