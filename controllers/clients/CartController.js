const Cart = require("../../models/carts/cart.model");
const Products = require("../../models/products/products");
class CartController {
  /// Giao diện giỏ hàng
  async index(req, res) {
    const carts = await Cart.findOne({ _id: req.cookies.cartId });
    /// Lấy ra tất cả các id của sản phẩm đã thêm trong giỏ hàng
    let items = [];
    let count = [];
    let total = 0;
    if (carts.products.length > 0) {
      carts.products.forEach((item) => {
        items.push(item.product_id);
        count.push(item.quantity);
      });
    }
    const productCart = await Products.find({ _id: { $in: items } });
    // Sắp xếp các sản phẩm theo thứ tự của các ID trong mảng items
    const sortedProductCart = items.map((id) =>
      productCart.find((product) => product._id.toString() === id)
    );
    let costs = [];
    sortedProductCart.forEach((item, index) => {
      total += item.Price * count[index];
      const price = item.Price.toLocaleString("vi-VN");
      costs.push(price);
    });
    total = total.toLocaleString("vi-VN");
    res.render("./clients/pages/carts/index", {
      productCart: sortedProductCart,
      costs: costs,
      count: count,
      total: total,
    });
  }
  /// End giao diện giỏ hàng
  /// Thêm sản phẩm vào giỏ hàng
  async add(req, res) {
    const productId = req.params.productId;
    const cartId = req.cookies.cartId;
    let quantity = parseInt(req.body.quantity);
    const cart = await Cart.findOne({ _id: cartId });
    if (cart) {
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
          await Cart.updateOne(
            { _id: cartId },
            { $push: { products: objCart } }
          );
          res.status(200).json({ message: "Thành công" });
        }
      } catch {
        res.status(500).json({ message: "Đã xảy ra lỗi" });
      }
    }
  }
  ///End thêm sản phẩm vào giỏ hàng
  /// Xóa sản phẩm ra khỏi giỏ hàng
  async remove(req, res) {
    const cartId = req.cookies.cartId;
    const product_id = req.params.productId;
    await Cart.updateOne(
      { _id: cartId },
      { $pull: { products: { product_id: product_id } } }
    );
    res.redirect("back");
  }
  /// End xóa sản phẩm ra khỏi giỏ hàng
}
module.exports = new CartController();
