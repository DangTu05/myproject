const Products = require("../../../models/products/products");
const time = require("../../../util/times/VnTime");
class Detail {
  async show(req, res, next) {
    let find = {
      status: "active",
      deleted: false,
      _id: req.params.id,
    };
    let Time = {};
    const Count = await Products.countDocuments({ deleted: false });
    const product = await Products.findOne(find);
    const Price = product.Price.toLocaleString("vi-VN");
    if (product.createdAt) {
      Time.createdAt = time(product.createdAt);
    }
    if (product.updatedAt) {
      // Chuyển đổi updatedAt thành đối tượng Date nếu cần
      Time.updatedAt = time(product.updatedAt);
    }    
    res.render("admin/pages/products/Detail", {
      product: product,
      Count:Count,
      Price: Price,
      Time:Time
    });
  }
}
module.exports = new Detail();
