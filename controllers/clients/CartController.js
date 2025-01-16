const Cart = require("../../models/carts/cart.model");
class CartController {
  async add(req, res) {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;
    let quantity = parseInt(req.body.quantity);
    const cart = await Cart.findOne({ _id: cartId });
    const existProduct = cart.products.find(
      (item) => item.product_id === productId
    );

    try {
      if (existProduct) {
        quantity = quantity + existProduct.quantity;
        await Cart.updateOne(
          { _id: cartId, "products.product_id": productId },
          { $set: { "products.$.quantity": quantity } }
        );
        res.status(200).json({ message: "Thành công" });
      } else {
        const objCart = {
          product_id: productId,
          quantity: quantity,
        };
        await Cart.updateOne({ _id: cartId }, { $push: { products: objCart } });
        res.status(200).json({ message: "Thành công" });
      }
    } catch (error) {
      res.status(500).json({ message: "Đã xảy ra lỗi" });
    }
  }
}
module.exports = new CartController();
