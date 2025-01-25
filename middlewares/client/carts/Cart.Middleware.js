const Cart = require("../../../models/carts/cart.model");
const Products = require("../../../models/products/products");
module.exports.cartId = async (req, res, next) => {
  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();
    const time = 1000 * 60 * 60 * 24 * 365;
    res.cookie("cartId", cart._id, { maxAge: time });
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });
    if (cart) {
      if (cart.products.length > 0) {
        let items = [];
        cart.products.forEach((item) => {
          items.push(item.product_id);
        });
        const productCart = await Products.find({ _id: { $in: items } }).limit(
          3
        );
        res.locals.productCart = productCart;
        res.locals.carts = cart;
        res.locals.miniCart = cart.products.length;
      }
    }
  }
  next();
};
