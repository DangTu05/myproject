class Validate {
  create(req, res, next) {
    if (!req.body.product_name) {
      return res.json({ message: "Tên sản phẩm không được để trống!" });
    }
    if (!req.body.Price) {
      return res.json({ message: "Giá không được để trống!" });
    }
    if (req.body.Price < 0) {
      return res.json({ message: "Giá không được âm!" });
    }
    if (!req.body.quantity) {
      return res.json({ message: "Số lượng không được để trống!" });
    }
    if (req.body.quantity < 0) {
      return res.json({ message: "Số lượng không được âm!" });
    }
    if (!req.body.category_id) {
      return res.json({ message: "Danh mục không được để trống!" });
    }
    next();
  }
}
module.exports = new Validate();
