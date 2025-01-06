class Validate {
  create(req, res, next) {
    if (!req.body.product_name) {
      res.json({ message: "Tên sản phẩm không được để trống!" });
      return;
    }
    if (!req.body.Price) {
      res.json({ message: "Giá không được để trống!" });
    }
    if(req.body.Price<0){
      res.json({ message: "Giá không được âm!" });
    }
    if(!req.body.quantity){
      res.json({ message: "Số lượng không được để trống!" });
    }
    if(req.body.quantity<0){
      res.json({ message: "Số lượng không được âm!" });
    }
    if(!req.body.parent_id){
      res.json({ message: "Danh mục không được để trống!" });
    }
    next();
  }
}
module.exports = new Validate();
