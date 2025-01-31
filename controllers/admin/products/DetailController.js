const Products = require("../../../models/products/products");
const time = require("../../../util/times/VnTime");
const Accounts = require("../../../models/accounts/account.model");
class Detail {
  async show(req, res, next) {
    let find = {
      status: "active",
      deleted: false,
      _id: req.params.id,
    };
    let Time = {};
    const Count = await Products.countDocuments({
      deleted: false,
      status: "active",
    });
    const product = await Products.findOne(find);
    console.log(product);
    
    if (product.createdBy) {
      const user = await Accounts.findOne({ _id: product.createdBy });
      product.createdName = user.name;
    }
    const Price = product.Price.toLocaleString("vi-VN");
    if (product.updatedBy.length > 0) {
      const last_id = product.updatedBy.splice(-1)[0].user_id;
      const user = await Accounts.findOne({ _id: last_id });
      product.updatedName = user.name;
    }
    if (product.createdAt) {
      Time.createdAt = time(product.createdAt);
    }
    if (product.updatedAt) {
      // Chuyển đổi updatedAt thành đối tượng Date nếu cần
      Time.updatedAt = time(product.updatedAt);
    }
    res.render("admin/pages/products/Detail", {
      product: product,
      Count: Count,
      Price: Price,
      Time: Time,
    });
  }
}
module.exports = new Detail();
