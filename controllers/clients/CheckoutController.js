const Order = require("../../models/orders/order.model");
const Address = require("../../models/orders/address.model");
class CheckoutController {
  /// View giao diện checkout
  async index(req, res) {
    const cartId = req.cookies.cartId;
    const info = await Address.findOne({
      cartId: cartId,
    });
    res.render("./clients/pages/checkout/index", {
      infos: info ? info.info : [],
    });
  }
  /// End view giao diện view

  /// Tạo thông tin nhận hàng
  async createInfo(req, res) {
    const cartId = req.cookies.cartId;
    const data = {
      phone: req.body.phone,
      name: req.body.name,
      address: req.body.address,
    };
    const infos = await Address.findOne({
      cartId: cartId,
    });
    if (!infos) {
      req.body.cartId = cartId;
      const info = new Address({ cartId: cartId, info: [data] });
      try {
        await info.save();
        res.status(200).json({ message: "Thành công" });
      } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    } else {
      await Address.updateOne(
        { cartId: cartId },
        { $push: { info: req.body } }
      );
      res.redirect("back");
    }
  }
  /// End thông tin nhận hàng

  /// Sửa thông tin nhận hàng
  async editInfo(req, res) {
    const cartId = req.cookies.cartId;
    const info = await Address.findOne({ cartId: cartId });
    console.log(info.info);
    console.log(req.params.id);

    info.info.forEach((item) => {
      console.log(item);
    });
    const data = info.info.find(
      (item) => item._id.toString() === req.params.id
    );

    // Cập nhật thông tin
    data.phone = req.body.phone;
    data.name = req.body.name;
    data.address = req.body.address;

    // Lưu tài liệu Address sau khi cập nhật
    await info.save();
    res.redirect("back");
  }
  /// End sửa thông tin nhận hàng

  /// Xóa thông tin nhận hàng
  async deleteInfo(req, res) {
    const id = req.params.id;
    const cartId = req.cookies.cartId;
    await Address.updateOne(
      { cartId: cartId },
      { $pull: { info: { _id: id } } }
    );
    res.redirect("back");
  }
  /// End xóa thông tin
}
module.exports = new CheckoutController();
